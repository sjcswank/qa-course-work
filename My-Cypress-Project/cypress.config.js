const { defineConfig } = require('cypress');
const { spawn, exec } = require('child_process');
const fs = require('fs').promises;

const directoryPath = 'C:/Users/heath/Workspace/contact-list';
let systemUnderTest = null

async function waitForLockRelease(filePath, timeout = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await fs.access(filePath, fs.constants.F_OK); // Check if file exists
      // File exists, but is it locked? Let's check with taskkill (Windows-specific)
      // This is not a foolproof way to check for locks, but it helps
      // The subsequent fs.rm will fail if it's still locked
      return; // File is accessible
    } catch (e) {
      if (e.code === 'ENOENT') {
        return; // File already deleted, success
      }
      // Assuming 'e.code' could indicate a lock, or just a temporary state
      console.warn(`File is still locked. Retrying... (Time: ${Date.now() - start}ms)`);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  throw new Error(`Timeout waiting for file lock to be released on ${filePath}`);
}

module.exports = defineConfig({
  e2e: {
    // Declare the function as async so it can properly return a Promise
    async setupNodeEvents(on, config) {
      on('task', {
        
        startSystemUnderTest() {
          return new Promise((resolve, reject) => {
            // Kill any already running Python servers
            if (systemUnderTest && systemUnderTest.exitCode === null) {
                console.warn('Python server is already running, based on state. Forcing kill...');
                systemUnderTest.kill('SIGKILL');
                systemUnderTest = null;
            }

            // Start new server
            console.log('Starting Python server...');
            systemUnderTest = spawn('python', [directoryPath + '/main.py']);
            let hasResolved = false; // Flag to prevent multiple resolutions

            const handleOutput = (data) => {
                const output = data.toString();
                console.log(`Python output: ${output}`);
                if (output.includes('Running on') && !hasResolved) {
                    hasResolved = true;
                    console.log('Python server started successfully.');
                    resolve('Python server started successfully');
                }
            };

            // check both stout and sterr for 'Running on' message
            systemUnderTest.stdout.on('data', handleOutput);
            systemUnderTest.stderr.on('data', handleOutput);

            // This is the critical change: Handle errors and exit events together.
            systemUnderTest.on('exit', (code, signal) => {
                if (!hasResolved) { // If the promise hasn't resolved, it must have failed.
                    const errorMessage = `Python server exited unexpectedly with code ${code} and signal ${signal}.`;
                    console.error(errorMessage);
                    systemUnderTest = null;
                    reject(new Error(errorMessage));
                } else {
                    console.log(`Python server exited normally with code ${code} and signal ${signal}.`);
                    systemUnderTest = null;
                }
            });

            // An "error" event is distinct from "exit" and indicates a failure to spawn.
            systemUnderTest.on('error', (err) => {
                if (!hasResolved) {
                    console.error('Failed to start Python server:', err);
                    systemUnderTest = null;
                    reject(err);
                }
            });
          }).then(result => {
            // This is where you add the log to verify the state.
            console.log('Verification at end of start task:', { result, systemUnderTest });
            return result;
          });
        },

        stopSystemUnderTest() {
          console.log('Attempting to stop Python server. Current state:', !!systemUnderTest);
          if (systemUnderTest) {
            console.log('Stopping Python server...');
            return new Promise((resolve) => {
              const timeout = setTimeout(() => {
                console.warn('Python server did not exit gracefully, forcing kill.');
                systemUnderTest.kill('SIGKILL');
              }, 5000);

              systemUnderTest.on('exit', () => {
                clearTimeout(timeout);
                console.log('Python server stopped.');
                systemUnderTest = null;
                resolve(null);
              });
              
              systemUnderTest.kill(); // Graceful kill (SIGTERM)
            });
          }
          console.log('Python server not running, nothing to stop.');
          return Promise.resolve(null);
        },

        async deleteTestData() {
          const instanceDir = directoryPath + '/instance';
          const dbFilePath = `${instanceDir}/database.db`;

          try {
            await waitForLockRelease(dbFilePath); // Wait for the lock to be released
            await fs.rm(instanceDir, { recursive: true, force: true });
            console.log(`Directory deleted successfully: ${instanceDir}`);
          } catch (error) {
            console.error(`Error removing directory ${instanceDir}:`, error);
            throw error;
          }
          return null;
        },

        async forceDeleteTestData() {
          const instanceDir = directoryPath + '/instance';
          try {
            // Attempt to delete the directory
            await fs.rm(instanceDir, { recursive: true, force: true });
            console.log(`Directory deleted successfully: ${instanceDir}`);
          } catch (error) {
            if (error.code === 'EBUSY') {
              console.warn(`File locked. Using command line to force delete.`);
              // On Windows, use 'rmdir /s /q' to forcefully delete a directory
              await new Promise((resolve, reject) => {
                const command = `rmdir /s /q "${instanceDir}"`;
                exec(command, (err, stdout, stderr) => {
                  if (err) {
                    console.error(`Error running command: ${command}`, stderr);
                    return reject(err);
                  }
                  console.log(`Successfully executed command: ${command}`);
                  resolve();
                });
              });
            } else if (error.code === 'ENOENT') {
              console.log(`Directory does not exist: ${instanceDir}`);
            } else {
              console.error(`Unexpected error during file deletion:`, error);
              throw error;
            }
          }
          return null;
        },

        //TODO: refactor this task so it is not so flakey
        killPythonProcess() {
          return new Promise((resolve, reject) => {
            if (!systemUnderTest) {
              console.log('No Python process to kill.');
              return resolve(null);
            }
            console.log('Attempting to kill Python process with taskkill...');
            exec(`taskkill /pid ${systemUnderTest.pid} /f /t`, (err, stdout, stderr) => {
              if (err) {
                console.error(`Error killing process: ${err.message}`);
                // In some cases, the process might have already exited, so we proceed.
              } else {
                console.log(`Process with PID ${systemUnderTest.pid} killed.`);
              }
              systemUnderTest = null; // Clear the reference regardless of exec outcome
              resolve(null);
            });
          });
        }

      });
      return config;
    },
  },
});