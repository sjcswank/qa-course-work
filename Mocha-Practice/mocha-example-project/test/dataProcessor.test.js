const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised').default;
chai.use(chaiAsPromised);
const { expect } = chai;

describe('dataProcessor Tests', () => {
    let processFiles;
    let sandbox;

    beforeEach(() => {
        // create sinon sandbox for control
        sandbox = sinon.createSandbox();

        // stub the fs.readFile method to prevent actual file I/O
        const readFileStub = sandbox.stub();

        readFileStub.withArgs('file1.txt', 'utf8').resolves('Content of file 1.');
        readFileStub.withArgs('file2.txt', 'utf8').resolves('Content of file 2.');
        readFileStub.withArgs('file3.txt', 'utf8').resolves('Content of file 3.');
        readFileStub.rejects(new Error('File not found'));

        processFiles = proxyquire('../dataProcessor', {
            'fs': {
                promises : {
                    readFile: readFileStub
                }
            }
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should concatenate the contents of multiple files', async () => {
        const filenames = ['file1.txt', 'file2.txt', 'file3.txt'];
        const result = await processFiles(filenames);
        expect(result).to.deep.equal(['Content of file 1.', 'Content of file 2.', 'Content of file 3.'])
    });

    it('should handle errors gracefully for non-existant files', async () => {
        const filenames = ['file1.txt', 'non-existant-file.txt']
        await expect(processFiles(filenames)).to.be.rejectedWith('File not found');
    });
});