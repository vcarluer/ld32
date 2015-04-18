game.data = { "font" : "18px Lucida Handwriting", "height" : 600, "pauseScreen" : { "scenes" : [ { "actions" : [ { "type" : "Wait", "waitType" : "Forever" } ], "backgroundColor" : [ 242, 242, 242, 255 ], "name" : "main", "objects" : [ { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "height" : 38, "onMouseRelease" : [ { "comment" : "resume game", "script" : "this.getGame().resume();", "type" : "RunScript" } ], "resource" : "MenuButton", "sync" : false, "text" : "Resume", "width" : 171, "x" : 304, "y" : 170 }, { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "height" : 38, "name" : "MenuButton1", "onMouseMove" : [ { "changeObjectBackgroundColor" : true, "changeObjectColor" : false, "color" : [ 255, 255, 255, 255 ], "object" : "MenuButton1", "type" : "ChangeColor" } ], "onMouseRelease" : [ { "target" : "saveGame", "targetType" : 0, "type" : "GoToScene" } ], "resource" : "MenuButton", "sync" : false, "text" : "Save Game", "width" : 171, "x" : 305, "y" : 230 }, { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "height" : 38, "name" : "MenuButton2", "onMouseMove" : [ { "changeObjectBackgroundColor" : true, "changeObjectColor" : false, "color" : [ 255, 255, 255, 255 ], "object" : "MenuButton2", "type" : "ChangeColor" } ], "onMouseRelease" : [ { "target" : "loadGame", "targetType" : 0, "type" : "GoToScene" } ], "resource" : "MenuButton", "sync" : false, "text" : "Load Game", "width" : 171, "x" : 304, "y" : 293 }, { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "height" : 38, "name" : "MenuButton4", "onMouseMove" : [ { "changeObjectBackgroundColor" : true, "changeObjectColor" : false, "color" : [ 255, 255, 255, 255 ], "object" : "MenuButton4", "type" : "ChangeColor" } ], "onMouseRelease" : [ { "type" : "End" } ], "resource" : "MenuButton", "sync" : false, "text" : "Quit", "width" : 171, "x" : 303, "y" : 356 } ], "type" : "Scene" }, { "actions" : [ { "comment" : "create save slots", "script" : "var game = this.getGame();\nvar width = game.properties.width;\nvar height = game.properties.height;\nvar scene = this.getScene();\nvar hw = width / 2;\n\n //use already created and styled resource for all textbox slots\nvar data = { \"resource\" : \"emptySlotTextbox\" };\nvar line = 0;\nvar yoffset = 60;\nvar xoffset = 1;\nvar x = xoffset;\nvar border = 2; //border width\nvar savedGames = game.getSavedGames();\n\nfor( var i =0; i < 10; i++) {\n\tvar textbox = game.createObject(data, scene);\n\ttextbox.setWidth(hw-border-xoffset);\n\ttextbox.setX(x);\n\ttextbox.setY(yoffset + (textbox.height+5)*line);\n\ttextbox.setText((i+1) + \". Empty Slot\");\n\ttextbox.name = \"textbox_\" + i;\n\tif (i >= 0 && i < savedGames.length && savedGames[i] !== null) {\n\t\tvar entry = savedGames[i];\n\t\ttextbox.setText((i +1) + \". \" + entry.name+\"\\n\"+entry.date);\n\t}\n\ttextbox.bind(\"mouseUp\", function() {\n\t\tvar id = parseInt(this.name.split(\"_\")[1]);\n\t\tvar data = game.saveSlot(id);\n\t\tthis.setText( (id+1) + \". \" + data.name+\" \\n\"+data.date);\n\t});\n\t\n\tx += textbox.width + border + xoffset;\n\tscene.addObject(textbox);\t\n\n\tif ( (i+1) % 2 == 0) { //2 slots per line\n\t\tline++;\n\t\tx = xoffset;\n\t}\n}", "type" : "RunScript" }, { "type" : "Wait", "waitType" : "Forever" } ], "backgroundColor" : [ 242, 242, 242, 255 ], "name" : "saveGame", "objects" : [ { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "font" : "24px Ubuntu", "height" : 38, "resource" : "titleBox", "sync" : false, "text" : "Save Game", "textAlignment" : "Left|Top", "width" : 159, "x" : 308, "y" : 14 } ], "type" : "Scene" }, { "actions" : [ { "comment" : "create load slots", "script" : "var game = this.getGame();\nvar width = game.properties.width;\nvar height = game.properties.height;\nvar hw = width / 2;\nvar scene = this.getScene();\n\nvar data = { \"resource\" : \"emptySlotTextbox\" }; //use already created and styled resource for all textbox slots\nvar line = 0;\nvar xoffset = 1;\nvar x = xoffset;\nvar yoffset = 60;\nvar border = 2; //border width\nvar savedGames = game.getSavedGames();\n\nfor( var i =0; i < 10; i++) {\n\tvar textbox = game.createObject(data, scene);\n\ttextbox.setWidth(hw-border-1);\n\ttextbox.setX(x);\n\ttextbox.setY(yoffset+(textbox.height+5)*line);\n\ttextbox.setText((i+1) + \". Empty Slot\");\n\ttextbox.name = \"textbox_\" + i;\n\n\tif (i >= 0 && i < savedGames.length && savedGames[i] !== null) {\n\t\tvar entry = savedGames[i];\n\t\ttextbox.setText( (i +1)  + \". \" + entry.name+\" \\n\"+entry.date);\n\t\ttextbox.bind(\"mouseUp\", function() {\n\t\t\tvar id = parseInt(this.name.split(\"_\")[1]);\n\t\t\tvar data = game.loadSlot(id);\t\n\t\t}); \n\t}\n\t\n\tx += textbox.width + border + xoffset;\n\tscene.addObject(textbox);\t\n\n\tif ( (i+1) % 2 == 0) { //2 slots per line\n\t\tline++;\n\t\tx = xoffset;\n\t}\n}", "type" : "RunScript" }, { "type" : "Wait", "waitType" : "Forever" } ], "backgroundColor" : [ 242, 242, 242, 255 ], "name" : "loadGame", "objects" : [ { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "font" : "24px Ubuntu", "height" : 35, "resource" : "titleBox", "sync" : false, "text" : "Load Game", "width" : 171, "x" : 316, "y" : 14 } ], "type" : "Scene" } ] }, "resources" : { "DialogueBoxIntro" : { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 128, "name" : "DialogueBoxIntro", "objects" : [ { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "font" : "18px Arial", "height" : 30, "name" : "speakerTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 800, "x" : 20, "y" : 62 }, { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "font" : "18px Arial", "height" : 200, "name" : "dialogueTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 800, "x" : 20, "y" : 92 } ], "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "type" : "DialogueBox", "visible" : true, "width" : 799, "x" : 20, "y" : 62 }, "MenuButton" : { "backgroundColor" : [ 220, 220, 220, 0 ], "backgroundOpacity" : 0, "cornerRadius" : 5, "font" : "18px Arial", "height" : 30, "name" : "MenuButton", "onMouseMove" : [ { "changeObjectBackgroundColor" : true, "changeObjectColor" : false, "color" : [ 255, 255, 255, 255 ], "object" : "MenuButton", "type" : "ChangeColor" } ], "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "text" : "Button", "textAlignment" : "HCenter|VCenter", "textColor" : [ 0, 0, 0, 255 ], "type" : "Button", "visible" : true, "width" : 137, "x" : 436, "y" : 260 }, "emptySlotTextbox" : { "backgroundColor" : [ 220, 220, 220, 0 ], "backgroundOpacity" : 0, "borderColor" : [ 0, 0, 0, 255 ], "borderWidth" : 1, "cornerRadius" : 9, "font" : "18px Arial", "height" : 41, "name" : "emptySlotTextbox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "Empty Slot", "textAlignment" : "Left|VCenter", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 163, "x" : 423, "y" : 277 }, "intro_bkg" : { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 600, "image" : "intro_bkg.png", "name" : "intro_bkg", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "type" : "Image", "visible" : true, "width" : 800, "x" : 0, "y" : 0 }, "spaceman" : { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "borderColor" : [ 0, 0, 0, 255 ], "borderWidth" : 5, "cornerRadius" : 5, "height" : 128, "name" : "spaceman", "nameColor" : [ 255, 255, 255, 255 ], "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "state" : "norm", "states" : { "norm" : "Spaceman_thb.png" }, "sync" : true, "textColor" : [ 255, 255, 255, 255 ], "type" : "Character", "visible" : true, "width" : 128, "x" : 331, "y" : 121 }, "titleBox" : { "backgroundColor" : [ 255, 255, 255, 104 ], "backgroundOpacity" : 104, "font" : "50px Lucida Handwriting", "height" : 140, "name" : "titleBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "text" : "An unconventional weapon", "textAlignment" : "HCenter|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 716, "x" : 37, "y" : 115 } }, "scenes" : [ { "actions" : [ { "type" : "Wait", "waitType" : "Forever" } ], "backgroundColor" : [ 242, 242, 242, 255 ], "backgroundImage" : "intro_bkg.png", "name" : "main_menu", "objects" : [ { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "font" : "20px Lucida Handwriting", "height" : 38, "onMouseRelease" : [ { "target" : "Next", "targetType" : 1, "type" : "GoToScene" } ], "resource" : "MenuButton", "sync" : false, "text" : "Start Game", "width" : 171, "x" : 304, "y" : 300 }, { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "font" : "20px Lucida Handwriting", "height" : 38, "name" : "MenuButton1", "onMouseMove" : [ { "changeObjectBackgroundColor" : true, "changeObjectColor" : false, "color" : [ 255, 255, 255, 255 ], "object" : "MenuButton1", "type" : "ChangeColor" } ], "onMouseRelease" : [ { "comment" : "Go to Load Game Screen", "script" : "var game = this.getGame();\ngame.pause();\ngame.getModel().setScene(\"loadGame\");", "type" : "RunScript" } ], "resource" : "MenuButton", "sync" : false, "text" : "Load Game", "width" : 171, "x" : 304, "y" : 370 }, { "resource" : "titleBox", "x" : 39, "y" : 22 } ], "type" : "Scene" }, { "actions" : [ { "loop" : false, "sound" : "intro_0.wav", "type" : "PlaySound", "volume" : 100 }, { "object" : "intro_bkg", "transitions" : [ { "duration" : 8.0, "fadeType" : "in", "object" : "intro_bkg", "type" : "Fade" } ], "type" : "Show" }, { "time" : 2.0, "type" : "Wait", "waitType" : "Timed" }, { "object" : "spaceman", "state" : "norm", "transitions" : [  ], "type" : "Show" }, { "object" : "DialogueBox", "transitions" : [  ], "type" : "Show" }, { "object" : "DialogueBox", "text" : "Can you see the man floating away from the space station? it's me... And it's the begining of a bad day.", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } } ], "backgroundColor" : [ 0, 0, 0, 255 ], "name" : "intro", "objects" : [ { "resource" : "intro_bkg", "sync" : false, "visible" : false }, { "height" : 96, "resource" : "spaceman", "sync" : false, "visible" : false, "width" : 96, "x" : 15, "y" : 466 }, { "backgroundColor" : [ 255, 255, 255, 255 ], "backgroundOpacity" : 255, "borderColor" : [ 0, 0, 0, 255 ], "borderWidth" : 1, "cornerRadius" : 5, "name" : "DialogueBox", "objects" : [ { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "font" : "18px Arial", "height" : 30, "name" : "speakerTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 631, "x" : 154, "y" : 450 }, { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "font" : "18px Arial", "height" : 200, "name" : "dialogueTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 631, "x" : 154, "y" : 480 } ], "resource" : "DialogueBoxIntro", "sync" : false, "visible" : false, "width" : 630, "x" : 154, "y" : 450 } ], "type" : "Scene" } ], "textSpeed" : 50, "title" : "ld32", "version" : 1280, "width" : 800 }