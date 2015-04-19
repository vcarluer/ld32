game.data = { "font" : "18px Arial", "height" : 600, "pauseScreen" : { "scenes" : [ { "actions" : [ { "type" : "Wait", "waitType" : "Forever" } ], "backgroundColor" : [ 242, 242, 242, 255 ], "name" : "main", "objects" : [ { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "height" : 38, "onMouseRelease" : [ { "comment" : "resume game", "script" : "this.getGame().resume();", "type" : "RunScript" } ], "resource" : "MenuButton", "sync" : false, "text" : "Resume", "width" : 171, "x" : 304, "y" : 170 }, { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "height" : 38, "name" : "MenuButton1", "onMouseMove" : [ { "changeObjectBackgroundColor" : true, "changeObjectColor" : false, "color" : [ 255, 255, 255, 255 ], "object" : "MenuButton1", "type" : "ChangeColor" } ], "onMouseRelease" : [ { "target" : "saveGame", "targetType" : 0, "type" : "GoToScene" } ], "resource" : "MenuButton", "sync" : false, "text" : "Save Game", "width" : 171, "x" : 305, "y" : 230 }, { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "height" : 38, "name" : "MenuButton2", "onMouseMove" : [ { "changeObjectBackgroundColor" : true, "changeObjectColor" : false, "color" : [ 255, 255, 255, 255 ], "object" : "MenuButton2", "type" : "ChangeColor" } ], "onMouseRelease" : [ { "target" : "loadGame", "targetType" : 0, "type" : "GoToScene" } ], "resource" : "MenuButton", "sync" : false, "text" : "Load Game", "width" : 171, "x" : 304, "y" : 293 }, { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "height" : 38, "name" : "MenuButton4", "onMouseMove" : [ { "changeObjectBackgroundColor" : true, "changeObjectColor" : false, "color" : [ 255, 255, 255, 255 ], "object" : "MenuButton4", "type" : "ChangeColor" } ], "onMouseRelease" : [ { "type" : "End" } ], "resource" : "MenuButton", "sync" : false, "text" : "Quit", "width" : 171, "x" : 303, "y" : 356 } ], "type" : "Scene" }, { "actions" : [ { "comment" : "create save slots", "script" : "var game = this.getGame();\nvar width = game.properties.width;\nvar height = game.properties.height;\nvar scene = this.getScene();\nvar hw = width / 2;\n\n //use already created and styled resource for all textbox slots\nvar data = { \"resource\" : \"emptySlotTextbox\" };\nvar line = 0;\nvar yoffset = 60;\nvar xoffset = 1;\nvar x = xoffset;\nvar border = 2; //border width\nvar savedGames = game.getSavedGames();\n\nfor( var i =0; i < 10; i++) {\n\tvar textbox = game.createObject(data, scene);\n\ttextbox.setWidth(hw-border-xoffset);\n\ttextbox.setX(x);\n\ttextbox.setY(yoffset + (textbox.height+5)*line);\n\ttextbox.setText((i+1) + \". Empty Slot\");\n\ttextbox.name = \"textbox_\" + i;\n\tif (i >= 0 && i < savedGames.length && savedGames[i] !== null) {\n\t\tvar entry = savedGames[i];\n\t\ttextbox.setText((i +1) + \". \" + entry.name+\"\\n\"+entry.date);\n\t}\n\ttextbox.bind(\"mouseUp\", function() {\n\t\tvar id = parseInt(this.name.split(\"_\")[1]);\n\t\tvar data = game.saveSlot(id);\n\t\tthis.setText( (id+1) + \". \" + data.name+\" \\n\"+data.date);\n\t});\n\t\n\tx += textbox.width + border + xoffset;\n\tscene.addObject(textbox);\t\n\n\tif ( (i+1) % 2 == 0) { //2 slots per line\n\t\tline++;\n\t\tx = xoffset;\n\t}\n}", "type" : "RunScript" }, { "type" : "Wait", "waitType" : "Forever" } ], "backgroundColor" : [ 242, 242, 242, 255 ], "name" : "saveGame", "objects" : [ { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "font" : "24px Ubuntu", "height" : 38, "resource" : "titleBox", "sync" : false, "text" : "Save Game", "textAlignment" : "Left|Top", "width" : 159, "x" : 308, "y" : 14 } ], "type" : "Scene" }, { "actions" : [ { "comment" : "create load slots", "script" : "var game = this.getGame();\nvar width = game.properties.width;\nvar height = game.properties.height;\nvar hw = width / 2;\nvar scene = this.getScene();\n\nvar data = { \"resource\" : \"emptySlotTextbox\" }; //use already created and styled resource for all textbox slots\nvar line = 0;\nvar xoffset = 1;\nvar x = xoffset;\nvar yoffset = 60;\nvar border = 2; //border width\nvar savedGames = game.getSavedGames();\n\nfor( var i =0; i < 10; i++) {\n\tvar textbox = game.createObject(data, scene);\n\ttextbox.setWidth(hw-border-1);\n\ttextbox.setX(x);\n\ttextbox.setY(yoffset+(textbox.height+5)*line);\n\ttextbox.setText((i+1) + \". Empty Slot\");\n\ttextbox.name = \"textbox_\" + i;\n\n\tif (i >= 0 && i < savedGames.length && savedGames[i] !== null) {\n\t\tvar entry = savedGames[i];\n\t\ttextbox.setText( (i +1)  + \". \" + entry.name+\" \\n\"+entry.date);\n\t\ttextbox.bind(\"mouseUp\", function() {\n\t\t\tvar id = parseInt(this.name.split(\"_\")[1]);\n\t\t\tvar data = game.loadSlot(id);\t\n\t\t}); \n\t}\n\t\n\tx += textbox.width + border + xoffset;\n\tscene.addObject(textbox);\t\n\n\tif ( (i+1) % 2 == 0) { //2 slots per line\n\t\tline++;\n\t\tx = xoffset;\n\t}\n}", "type" : "RunScript" }, { "type" : "Wait", "waitType" : "Forever" } ], "backgroundColor" : [ 242, 242, 242, 255 ], "name" : "loadGame", "objects" : [ { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "font" : "24px Ubuntu", "height" : 35, "resource" : "titleBox", "sync" : false, "text" : "Load Game", "width" : 171, "x" : 316, "y" : 14 } ], "type" : "Scene" } ] }, "resources" : { "$pcname" : { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "borderColor" : [ 0, 0, 0, 255 ], "borderWidth" : 5, "cornerRadius" : 5, "height" : 96, "name" : "$pcname", "nameColor" : [ 255, 0, 127, 255 ], "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "state" : "inspace", "states" : { "inspace" : "Spaceman_thb.png" }, "sync" : true, "textColor" : [ 0, 0, 0, 255 ], "type" : "Character", "visible" : true, "width" : 96, "x" : 347, "y" : 137 }, "DialogueBoxBot" : { "backgroundColor" : [ 255, 255, 255, 207 ], "backgroundOpacity" : 207, "borderColor" : [ 0, 0, 0, 255 ], "borderWidth" : 1, "cornerRadius" : 5, "height" : 229, "name" : "DialogueBoxBot", "objects" : [ { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 30, "name" : "speakerTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 800, "x" : 42, "y" : 210 }, { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 200, "name" : "dialogueTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 800, "x" : 42, "y" : 240 } ], "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "type" : "DialogueBox", "visible" : true, "width" : 799, "x" : 42, "y" : 210 }, "DialogueBoxGameOver" : { "backgroundColor" : [ 255, 255, 255, 198 ], "backgroundOpacity" : 198, "height" : 229, "name" : "DialogueBoxGameOver", "objects" : [ { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 30, "name" : "speakerTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 255, 0, 127, 255 ], "type" : "TextBox", "visible" : true, "width" : 474, "x" : 158, "y" : 70 }, { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 200, "name" : "dialogueTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 474, "x" : 158, "y" : 100 } ], "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "type" : "DialogueBox", "visible" : true, "width" : 473, "x" : 158, "y" : 70 }, "DialogueBoxIntro" : { "backgroundColor" : [ 255, 255, 255, 181 ], "backgroundOpacity" : 181, "height" : 229, "name" : "DialogueBoxIntro", "objects" : [ { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 30, "name" : "speakerTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 255, 0, 127, 255 ], "type" : "TextBox", "visible" : true, "width" : 328, "x" : 80, "y" : 121 }, { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 200, "name" : "dialogueTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 328, "x" : 80, "y" : 151 } ], "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "type" : "DialogueBox", "visible" : true, "width" : 327, "x" : 80, "y" : 121 }, "Image" : { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 600, "image" : "intro_bkg.png", "name" : "Image", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "type" : "Image", "visible" : true, "width" : 800, "x" : 0, "y" : 0 }, "MenuButton" : { "backgroundColor" : [ 220, 220, 220, 0 ], "backgroundOpacity" : 0, "cornerRadius" : 5, "height" : 30, "name" : "MenuButton", "onMouseMove" : [ { "changeObjectBackgroundColor" : true, "changeObjectColor" : false, "color" : [ 255, 255, 255, 255 ], "object" : "MenuButton", "type" : "ChangeColor" } ], "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "text" : "Button", "textAlignment" : "HCenter|VCenter", "textColor" : [ 0, 0, 0, 255 ], "type" : "Button", "visible" : true, "width" : 137, "x" : 436, "y" : 260 }, "Ripley" : { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "borderColor" : [ 0, 0, 0, 255 ], "borderWidth" : 2, "cornerRadius" : 5, "height" : 191, "name" : "Ripley", "nameColor" : [ 170, 0, 127, 255 ], "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "state" : "worried", "states" : { "base" : "pc1_f_base.png", "closed" : "pc1_f1_eyeclosed.png", "o" : "pc1_f_o.png", "smile" : "pc1_f_smile.png", "worried" : "pc1_f_worried.png" }, "sync" : true, "textColor" : [ 0, 0, 0, 255 ], "type" : "Character", "visible" : true, "width" : 191, "x" : 300, "y" : 90 }, "TBGameOver" : { "backgroundColor" : [ 255, 255, 255, 169 ], "backgroundOpacity" : 169, "borderColor" : [ 0, 0, 0, 255 ], "borderWidth" : 2, "cornerRadius" : 5, "font" : "64px Arial", "height" : 68, "name" : "TBGameOver", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "text" : "Text goes here...", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 397, "x" : 0, "y" : 400 }, "TextBoxO2" : { "backgroundColor" : [ 255, 255, 255, 195 ], "backgroundOpacity" : 195, "font" : "28px Lucida Handwriting", "height" : 37, "name" : "TextBoxO2", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "text" : "O2 $odeux %", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 128, "x" : 20, "y" : 164 }, "emptySlotTextbox" : { "backgroundColor" : [ 220, 220, 220, 0 ], "backgroundOpacity" : 0, "borderColor" : [ 0, 0, 0, 255 ], "borderWidth" : 1, "cornerRadius" : 9, "height" : 41, "name" : "emptySlotTextbox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "text" : "Empty Slot", "textAlignment" : "Left|VCenter", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 163, "x" : 314, "y" : 165 }, "intro_bkg" : { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 600, "image" : "intro_bkg.png", "name" : "intro_bkg", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "type" : "Image", "visible" : true, "width" : 800, "x" : 0, "y" : 0 }, "menuButton" : { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "borderColor" : [ 0, 0, 0, 255 ], "borderWidth" : 1, "cornerRadius" : 10, "font" : "18px Lucida Handwriting", "height" : 66, "name" : "menuButton", "onMouseMove" : [ { "changeObjectBackgroundColor" : true, "changeObjectColor" : false, "color" : [ 255, 255, 255, 255 ], "object" : "menuButton", "type" : "ChangeColor" } ], "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "text" : "Button", "textAlignment" : "HCenter|VCenter", "textColor" : [ 0, 0, 0, 255 ], "type" : "Button", "visible" : true, "width" : 200, "x" : 0, "y" : 400 }, "spaceman" : { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "borderColor" : [ 0, 0, 0, 255 ], "borderWidth" : 5, "cornerRadius" : 5, "height" : 128, "name" : "spaceman", "nameColor" : [ 255, 255, 255, 255 ], "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "state" : "norm", "states" : { "norm" : "Spaceman_thb.png" }, "sync" : true, "textColor" : [ 255, 255, 255, 255 ], "type" : "Character", "visible" : true, "width" : 128, "x" : 331, "y" : 121 }, "titleBox" : { "backgroundColor" : [ 255, 255, 255, 104 ], "backgroundOpacity" : 104, "font" : "50px Lucida Handwriting", "height" : 140, "name" : "titleBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "text" : "An unconventional weapon", "textAlignment" : "HCenter|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 716, "x" : 37, "y" : 115 }, "weaponstrike" : { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 600, "image" : "weaponstrike.png", "name" : "weaponstrike", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "type" : "Image", "visible" : true, "width" : 800, "x" : 0, "y" : 0 }, "white" : { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 600, "image" : "white.png", "name" : "white", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : true, "type" : "Image", "visible" : true, "width" : 800, "x" : 0, "y" : 0 } }, "scenes" : [ { "actions" : [ { "type" : "Wait", "waitType" : "Forever" } ], "backgroundColor" : [ 242, 242, 242, 255 ], "backgroundImage" : "intro_bkg.png", "name" : "main_menu", "objects" : [ { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "font" : "20px Lucida Handwriting", "height" : 38, "onMouseRelease" : [ { "target" : "Next", "targetType" : 1, "type" : "GoToScene" } ], "resource" : "MenuButton", "sync" : false, "text" : "Start Game", "width" : 171, "x" : 304, "y" : 300 }, { "backgroundColor" : [ 220, 220, 220, 255 ], "backgroundOpacity" : 255, "font" : "20px Lucida Handwriting", "height" : 38, "name" : "MenuButton1", "onMouseMove" : [ { "changeObjectBackgroundColor" : true, "changeObjectColor" : false, "color" : [ 255, 255, 255, 255 ], "object" : "MenuButton1", "type" : "ChangeColor" } ], "onMouseRelease" : [ { "comment" : "Go to Load Game Screen", "script" : "var game = this.getGame();\ngame.pause();\ngame.getModel().setScene(\"loadGame\");", "type" : "RunScript" } ], "resource" : "MenuButton", "sync" : false, "text" : "Load Game", "width" : 171, "x" : 304, "y" : 370 }, { "resource" : "titleBox", "x" : 39, "y" : 22 } ], "type" : "Scene" }, { "actions" : [ { "operator" : "assign", "type" : "ChangeGameVariable", "value" : "10", "variable" : "odeux" }, { "loop" : false, "sound" : "wilhelm.wav", "type" : "PlaySound", "volume" : 100 }, { "loop" : false, "sound" : "intro_0.wav", "type" : "PlaySound", "volume" : 100 }, { "object" : "intro_bkg", "transitions" : [ { "duration" : 8.0, "fadeType" : "in", "object" : "intro_bkg", "type" : "Fade" } ], "type" : "Show" }, { "object" : "Ripley", "state" : "worried", "transitions" : [ { "duration" : 1.0, "fadeType" : "in", "object" : "Ripley", "type" : "Fade" } ], "type" : "Show" }, { "object" : "DialogueBoxBot", "transitions" : [  ], "type" : "Show" }, { "name" : "0", "type" : "Label" }, { "character" : "Ripley", "object" : "DialogueBoxBot", "text" : "L'astronaute en train de dériver dans l'espace : c'est moi. \nEt c'est le début d'une journée très spéciale.\n\nLa dernière chose dont je me souviens c'est de me préparer \npour une sortie de maintenance.\n\nEt là, plus rien. Je crois que j'ai été aspiré dans l'espace \net que j'ai perdu connaissance.", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } }, { "object" : "intro_bkg", "transitions" : [  ], "type" : "Hide" }, { "backgroundImage" : "intro_bkg2.png", "type" : "ChangeBackground" }, { "character" : "Ripley", "object" : "DialogueBoxBot", "text" : "Je suis en train de dériver le long de la station. \n\nIl ne me reste que $odeux % d'oxygène. \nSi je veux m'en sortir vivante il va falloir être maligne.", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } }, { "name" : "2", "type" : "Label" }, { "backgroundImage" : "intro_bkg3.png", "type" : "ChangeBackground" }, { "loop" : false, "sound" : "air.wav", "type" : "PlaySound", "volume" : 100 }, { "object" : "Ripley", "state" : "smile", "type" : "ChangeState" }, { "character" : "Ripley", "object" : "DialogueBoxBot", "text" : "OK c'est bon je me suis bien approché de la station. \nJe la vois de prêt là. \nCela m'a couté un peu d'oxygène mais ça peut valoir le coût\nsi j’arrive à m’y raccrocher. \nJe n’arrive pas bien à évaluer les distances mais il me\nsemble que j’arrive un peu vite. ", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } }, { "name" : "3", "type" : "Label" }, { "object" : "Ripley", "state" : "smile", "type" : "ChangeState" }, { "loop" : false, "sound" : "air.wav", "type" : "PlaySound", "volume" : 100 }, { "backgroundImage" : "stationExtPos3.png", "type" : "ChangeBackground" }, { "character" : "Ripley", "object" : "DialogueBoxBot", "text" : "Super ! J’ai réussis à me stabiliser et à atteindre une passerelle de maintenance. \nIl ne me reste pas beaucoup d’oxygène mais je suis \npeut-être sauvé ! \nPar contre m’a combinaison a une fuite, c’est dangereux. \nDevait moi il y a la station spatiale et derrière moi, au bout \nde la passerelle, un poste de maintenance. \nIl contient peut-être de l’oxygène je ne sais pas.", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } }, { "character" : "Ripley", "object" : "DialogueBoxBot", "text" : "Ça serait peut-être plus prudent de commencer à retourner\nvers la station. \nLe problème c’est que je n’ai pas mon matériel pour \nm’accrocher à la structure. \nA moins que je demande de l’aide. ", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } }, { "name" : "3L", "type" : "Label" }, { "backgroundImage" : "intro_bkg4.png", "type" : "ChangeBackground" }, { "object" : "Ripley", "state" : "o", "type" : "ChangeState" }, { "object" : "DialogueBoxBot", "text" : "Ho non ! J’ai trébuché en cherchant à joindre le poste de\nmaintenance ce qui m’a renvoyer dans l’espace. \nJe suis trop bête ! ", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } }, { "name" : "4", "type" : "Label" }, { "object" : "Ripley", "state" : "base", "type" : "ChangeState" }, { "backgroundImage" : "stationextpos4.png", "type" : "ChangeBackground" }, { "character" : "Ripley", "object" : "DialogueBoxBot", "text" : "Ce n’est pas très bon j’ai continué à m’éloigner encore plus \nde la station. \nPar contre d’ici je peux facilement atteindre la plateforme \nde maintenance. \nLe problème c’est que je viens de trouver une fuite dans ma \ncombinaison. \nJe perds rapidement de l’oxygène là où elle est déchirée, \nil faudrait peut-être essayer de la boucher.", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } }, { "name" : "L", "type" : "Label" }, { "object" : "Ripley", "state" : "closed", "type" : "ChangeState" }, { "backgroundImage" : "intro_bkg4.png", "type" : "ChangeBackground" }, { "loop" : false, "sound" : "melancolic.wav", "type" : "PlaySound", "volume" : 100 }, { "character" : "Ripley", "object" : "DialogueBoxBot", "text" : "C’est la fin je crois. J’ai dépassé le poste de maintenance \net je n’ai plus rien à quoi m’accrocher. \nD’ici je vois la station spatiale de Global Management, \nc’est la dernière chose que je verrai de ma vie. \nJ’espère que mourir d’asphyxie n’est pas trop douloureux.", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } }, { "name" : "C", "type" : "Label" }, { "backgroundImage" : "deadspace.png", "type" : "ChangeBackground" }, { "object" : "weaponstrike", "transitions" : [ { "duration" : 0.3, "fadeType" : "in", "object" : "weaponstrike", "type" : "Fade" } ], "type" : "Show" }, { "loop" : false, "sound" : "strike.wav", "type" : "PlaySound", "volume" : 100 }, { "object" : "weaponstrike", "transitions" : [ { "duration" : 5.0, "fadeType" : "out", "object" : "weaponstrike", "type" : "Fade" } ], "type" : "Hide" }, { "character" : "Ripley", "object" : "DialogueBoxBot", "text" : "AAAAAaaarrrrrrrrrrrgggggggggggggg!! \nQu’est-ce que c’était. J’ai senti une énergie intense me \ntraverser. \nJ’ai l’impression que je peux dominer l’univers tout entier… \nUn moment de délire avant de perdre connaissance \net partir à jamais.", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } }, { "name" : "3E1", "type" : "Label" }, { "object" : "Ripley", "state" : "worried", "type" : "ChangeState" }, { "backgroundImage" : "spacestationE1.png", "type" : "ChangeBackground" }, { "character" : "Ripley", "object" : "DialogueBoxBot", "text" : "C’est pas vrai ! J’ai dû tenter un saut pour revenir vers la \nstation mais mes fusées n’ont pas fonctionnées. ", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } }, { "name" : "2E1", "type" : "Label" }, { "object" : "Ripley", "state" : "worried", "type" : "ChangeState" }, { "backgroundImage" : "spacestationE1.png", "type" : "ChangeBackground" }, { "character" : "Ripley", "object" : "DialogueBoxBot", "text" : "J’allais beaucoup trop vite et j’ai croisé la station ! \nJe ne peux plus m’y rattraper à présent. ", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } }, { "name" : "E1", "type" : "Label" }, { "backgroundImage" : "spacestationE1.png", "type" : "ChangeBackground" }, { "loop" : false, "sound" : "melancolic.wav", "type" : "PlaySound", "volume" : 100 }, { "object" : "Ripley", "state" : "closed", "type" : "ChangeState" }, { "object" : "DialogueBoxBot", "text" : "Me revoilà à nouveau perdue dans l’espace. \nD’ici je peux contempler la station une dernière fois en \nattendant une mort certaine. \nJ’espère que mourir d’asphyxie n’est pas trop douloureux.", "type" : "Dialogue", "wait" : { "type" : "Wait", "waitType" : "MouseClick" } } ], "backgroundColor" : [ 0, 0, 0, 255 ], "name" : "inspace", "objects" : [ { "resource" : "intro_bkg", "visible" : false }, { "resource" : "weaponstrike", "visible" : false }, { "resource" : "Ripley", "visible" : false, "x" : 15, "y" : 401 }, { "objects" : [ { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 30, "name" : "speakerTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 800, "x" : 215, "y" : 401 }, { "backgroundColor" : [ 255, 255, 255, 0 ], "backgroundOpacity" : 0, "height" : 200, "name" : "dialogueTextBox", "opacity" : 255, "padding" : { "bottom" : 0, "left" : 0, "right" : 0, "top" : 0 }, "sync" : false, "text" : "", "textAlignment" : "Left|Top", "textColor" : [ 0, 0, 0, 255 ], "type" : "TextBox", "visible" : true, "width" : 800, "x" : 215, "y" : 431 } ], "resource" : "DialogueBoxBot", "visible" : false, "x" : 215, "y" : 401 } ], "type" : "Scene" }, { "actions" : [ { "object" : "TBGameOver", "transitions" : [ { "duration" : 4.0, "fadeType" : "in", "object" : "TBGameOver", "type" : "Fade" } ], "type" : "Show" }, { "type" : "End" } ], "backgroundColor" : [ 0, 0, 0, 255 ], "backgroundImage" : "deadspace.png", "name" : "dead", "objects" : [ { "resource" : "TBGameOver", "text" : "GAME OVER", "visible" : false, "x" : 196, "y" : 353 } ], "type" : "Scene" }, { "actions" : [  ], "backgroundImage" : "stationcoridor.png", "name" : "dialog1", "objects" : [  ], "type" : "Scene" } ], "textSpeed" : 50, "title" : "ld32", "version" : 1280, "width" : 800 }