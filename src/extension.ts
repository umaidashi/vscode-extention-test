import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("test.command", (args) => {
    const msext = vscode.extensions.getExtension("Github.copilot");
    if (!msext) {
      return;
    }
    msext?.activate().then(() => {
      vscode.commands
        .executeCommand("editor.action.inlineSuggest.commit", args)
        .then((res) => {
          console.log(args, res);
          vscode.window.showInformationMessage("github copilotを使用しました");
        });
    });
    vscode.authentication
      .getSession("github", ["user:name"], {
        createIfNone: true,
      })
      .then((res) => {
        vscode.window.showInformationMessage(
          `${msext ? "認証しました" : "認証できませんでした"} ${
            res.account.label
          }`
        );
      });
  });

  context.subscriptions.push(disposable);
}

// exports.activate = function () {
//   console.log(`I am active! copilot`);
//   vscode.commands.registerCommand(
//     "editor.action.inlineSuggest.commit",
//     (args) => {
//       const msext = vscode.extensions.getExtension("Github.copilot");
//       if (!msext) {
//         return;
//       }
//       vscode.authentication
//         .getSession("github", ["user:name"], {
//           createIfNone: true,
//         })
//         .then((res) => {
//           vscode.window.showInformationMessage(
//             `${msext ? "copilot is installed" : "copilot is not installed"} ${
//               res.account.label
//             }`
//           );
//         });
//       msext?.activate().then(() => {
//         console.log("fire!!!!!!!!");
//         return vscode.commands.executeCommand(
//           "default:editor.action.inlineSuggest.commit"
//         );
//       });
//     }
//   );
// };

export function deactivate() {}
