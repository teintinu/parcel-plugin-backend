var fs = require("fs")
var path = require("path")

module.exports = function (bundler) {

  const rootDir = bundler.options.rootDir

  const {
    ['parcel-plugin-backend']: packageConfig
  } = require(Path.resolve('./package.json'));

  console.dir({packageConfig})

  let server;
  let starting = false;

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', data => {
    if (data.trim() === 'rs') {
      restartServer();
    }
  });

  bundler.on('buildEnd', restartServer);

  bundleBackend();

  function restartServer() {
    console.log(restartServer)
    if (starting) {
      return;
    }
    starting = true;
    // if (server) {
    //   console.log(`Killing running server`);
    //   server.once('exit', () => {
    //     console.log('Running server successfully killed');
    //     startServer();
    //   });
    //   process.kill(server.pid);
    //   return;
    // }
    startServer();
  }

  async function startServer() {
    console.log("startServer")
    if (server) {
      throw new Error('trying to start a server when one is already running');
    }
    // const entryPoint = path.join(outDir, outFile);
    // const inspectPort = await portfinder.getPortPromise({ port: 9229, stopPort: 9239 });
    // console.log(chalk.magenta.bold(`🚽 Starting server at: \`node ${entryPoint}\``));
    // server = execa('node', [`--inspect=${inspectPort}`, entryPoint]);
    // console.log(chalk.magenta.bold(`🚽 Started server: PID ${server.pid}`));
    // server.once('exit', () => {
    //   server = undefined;
    // });
    // server.stdout.pipe(process.stdout);
    // server.stderr.pipe(process.stderr);
    // starting = false;
  }

  function bundleBackend() {
    const backendEntry = getBackendEntry()
    console.log({ entryFile: backendEntry })
  }

  function getBackendEntry() {
    const options = [
      "backend",
      "backend/index",
      "src/backend/index",
      "server",
      "server/index",
      "src/server/index",
    ].reduce(function (p, c) {
      var s = path.join(rootDir, c)
      p.push(s + ".ts")
      p.push(s + ".js")
      return p
    }, [])
    var entry
    if (options.some(function (o) {
      if (fs.existsSync(o)) {
        entry = o
        return true
      }
    })) return entry
    console.log("parcel-plugin-backend needs a entrypoint. supported options:")
    options.forEach(function (o) {
      console.log("  ", o)
    })
  }
};