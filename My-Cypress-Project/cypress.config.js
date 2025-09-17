const { defineConfig } = require('cypress');
const { spawn, exec } = require('child_process');
const { resolve } = require('path');
const { Console } = require('console');
const fs = require('fs').promises;

const directoryPath = 'C:/Users/heath/Workspace/contact-list';
let systemUnderTest = null

module.exports = defineConfig({
  e2e: {
    // Declare the function as async so it can properly return a Promise
    async setupNodeEvents(on, config) {
      on('task', {
        
        startSystemUnderTest() {
          return new Promise((resolve, reject) => {
            // Kill any already running Python servers
            try {
              if (typeof systemUnderTest.pid == 'number') {
                console.warn('Python server is already running, based on state. Forcing kill...');
                systemUnderTest.kill('SIGKILL');
                systemUnderTest = null;
              } 
            } catch (e) {
              if (e.code == 'TypeError') {
                console.log('systemUnderTest not defined and not null: ' + systemUnderTest)
                systemUnderTest = null
              }
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

            // Handle errors and exit events together.
            systemUnderTest.on('exit', (code, signal) => {
                if (!hasResolved) { // If the promise hasn't resolved, it must have failed.
                    const errorMessage = `Python server exited unexpectedly with code ${code} and signal ${signal}.`;
                    console.error(errorMessage);
                    systemUnderTest = null;
                    reject(new Error(errorMessage));
                } else {
                    console.log(`Python server exited normally with code ${code} and signal ${signal}.`);
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

        killSystemUnderTest() {
          return new Promise((resolve, reject) => {
            try {
              if (systemUnderTest && typeof systemUnderTest.pid == 'number') {
                console.log('Attempting to kill Python process with taskkill...');
                exec(`taskkill /pid ${systemUnderTest.pid} /f /t`, (err, stdout, stderr) => {
                  if (err) {
                    console.error(`Error killing process: ${err.message}`);
                    console.log(systemUnderTest)
                    // In some cases, the process might have already exited, so we proceed.
                  } else {
                    console.log(`Process with PID ${systemUnderTest.pid} killed.`);
                  }
                  systemUnderTest = null; // Clear the reference regardless of exec outcome
                  resolve(null);
                });
              }
              else if (!systemUnderTest) {
                console.log('systemUnderTest is null: ' + systemUnderTest)
                resolve(null);
              }
            } catch (e) {
              console.log('Error: ' + e.message)
              console.log('systemUnderTest not defined and not null: ' + systemUnderTest)
              console.log('No Python process to kill.');
              systemUnderTest = null;
              resolve(null);
            }
          })
        }
      });
      return config;
    },
  },
});