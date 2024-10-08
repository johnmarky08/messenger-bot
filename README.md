# Messenger Bot - Tanjiro Project By [John Marky Natividad](https://www.facebook.com/johnmarky.natividad)
**Some Of The File Here Is Fully Obfuscated!!!**
## Notes: 
1. This is a different file from mirai, not all commands that you have there, can be used here.
2. Here you don't need to use ***args.join(" ")***, here you use ***global.msg***.
3. Permission: **0 - Everyone. 1 - Admin Only. 2 - Maintenance. 3 - John Marky Only**. When set to maintenance no one even the admins can use it.
4. Here's a format when you create a normal command: (Only Put Normal Commands In The Commands Folder)
```js
module.exports.config = {
  name: "Command Name",
  des: "Description Of The Command",
  nodeDepends: {},
  author: "Creator's Name",
  version: "1.0.0", //Version
  perm: 1 //Permission (See Note Number 3)
};

module.exports.start = async function(event, api) {...}
```
5. Here's a format when you create a non prefix command: (Only Put Non Prefix Commands In The noPrefix Folder)
```js
module.exports.config = {
  name: "Command Name",
  nodeDepends: {},
  keys: [
    "Here", "You", "Put", "The", "Keys", "That", "When", "Someone", "Types", "One", "Of", "This", "Keys", "This", "Command", "Will", "Be", "Executed"
  ],
  des: "Description Of The Command",
  author: "Creator's Name",
  version: "1.0.0" //Version
  //Permission Is Always For Everyone, Cannot Be Changed
};

module.exports.start = async function(event, api) {...}
```
6. **global.events.isUrlValid("Your Link")** Is used when you want to check your link is a valid link. Credits to D-Jukie For this.

### THANKS FOR USING ONE OF MUICHIRO'S PROJECTS!
### Feel free to ask anything to me or when you have problems encountered here, contact me at my [Facebook Account](https://www.facebook.com/johnmarky.natividad)