desc("This is the default task.");
task("default", function (params) {
  var fs = require("node-fs");
  var dot = require("dot");
  var UglifyJS = require("uglify-js");
  
  package(function(pkg) {
    console.log("Building " + pkg.title + " " + pkg.version);
    var files = fs.readdirSync("./src");
    fs.readFile("./src/" + files[0], "utf8", function(err, data) {
      if (err) throw err;
      var cmp = dot.template(data, {evaluate: /\{\{([\s\S]+?)\}\}/g,
        interpolate: /\{\{=([\s\S]+?)\}\}/g,
        encode: /\{\{!([\s\S]+?)\}\}/g,
        use: /\{\{#([\s\S]+?)\}\}/g, //compile time evaluation
        define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g, //compile time defs
        strip: false,
        varname: "it"})(pkg);
      var ast = UglifyJS.parse(cmp);
      ast.figure_out_scope();
      ast = ast.transform(UglifyJS.Compressor());
      // need to figure out scope again so mangler works optimally
      ast.figure_out_scope();
      ast.compute_char_frequency();
      ast.mangle_names();

      var min = ast.print_to_string({ comments: true });
      var buildDirectory = pkg.build.directory? dot.template(pkg.build.directory)(pkg) : "dist";
      try {
        fs.rmdirSync("./" + buildDirectory);
      } catch (e) {
      }
      fs.mkdirSync("./" + buildDirectory, 0777, true);
      console.log("Writing to " + buildDirectory);
      var buildFinalName = pkg.build.final_name ? dot.template(pkg.build.final_name)(pkg) : pkg.name + "-" + pkg.version;
      fs.writeFileSync("./" + buildDirectory + "/" + buildFinalName + ".min.js", min);
      fs.writeFileSync("./" + buildDirectory + "/" + buildFinalName + ".js", cmp);
      complete();
    });
  });
}, true);

task("publish", ["default"], function (params) {
  var gits = require("gits");

  package(function(pkg) {
    var tagName = pkg.version;
    gits.git(".", ["tag", "-a", "-m", "Publishing new version", "v" + tagName], function() {
      gits.git(".", ["push", "--tags"], function() {
        console.log("Created remote tag " + tagName);
        upload(function(fileName, error, result) {
          if (error) {
            console.log("Uploading " + fileName + " to GitHub failed: " + error);
            return;
          }
          console.log("Successfully uploaded " + fileName + " to GitHub");
        });
      });
    });
  });
});

function package(callback) {
  var fs = require("node-fs");

  fs.readFile("./package.json", "utf8", function(err, data) {
    if (err) throw err;
    callback(JSON.parse(data));
  });
}

function upload(callback) {
  var fs = require("node-fs");
  var dot = require("dot");
  var read = require("read");

  package(function(pkg) {
    if (pkg.repository.url.match("https?://github.com/.+/.+.git")) {
      read({ prompt : "Your GitHub username: " }, function (error, username) {
        read({ prompt : "Your GitHub password: ", silent : true }, function (error, password) {
          process.stdin.destroy();
          var path = pkg.repository.url.substring(0, pkg.repository.url.length - 4);
          path = "https://api.github.com/repos/" + path.substring(path.indexOf("github.com") + 11);
          var buildUniqueName = pkg.build.unique_name ? dot.template(pkg.build.unique_name)(pkg) : pkg.name + "-" + pkg.version;
          var buildDirectory = pkg.build.directory? dot.template(pkg.build.directory)(pkg) : "dist";
          var buildFinalName = pkg.build.final_name ? dot.template(pkg.build.final_name)(pkg) : pkg.name + "-" + pkg.version;

          post(path, "./" + buildDirectory + "/" + buildFinalName + ".js", buildUniqueName + ".js", {username: username, password: password}, callback);
          post(path, "./" + buildDirectory + "/" + buildFinalName + ".min.js", buildUniqueName + ".min.js", {username: username, password: password}, callback);
        });
      });
    }
  });

  function post(path, file, fileName, options, callback) {
    var needle = require("needle");

    needle.post(path + "/downloads", JSON.stringify({ 
      name: fileName, 
      size: fs.statSync(file).size, 
      content_type: "application/javascript" 
    }), {
      username: options.username, 
      password: options.password
    }, function(error, response, body) {
      if (error) {
        callback(fileName, error, null);
        return;
      }
      if (response.statusCode !== 201) {
        callback(fileName, body.message, null);
        return;
      }

      needle.post(body.s3_url, {
        key: body.path,
        acl: body.acl,
        success_action_status: 201,
        Filename: body.name,
        AWSAccessKeyId: body.accesskeyid,
        Policy: body.policy,
        Signature: body.signature,
        "Content-Type": body.mime_type,
        file: { 
          file: file, 
          content_type: "application/javascript"
        }
      }, {multipart: true}, function(error, response, body) {
        if (error) {
          callback(fileName, error, null);
          return;
        }
        if (response.statusCode !== 201) {
          callback(fileName, body.message, null);
          return;
        }
        callback(fileName, null, body);
      });
    });
  }
}
