const assert = require('assert');
const { JSDOM } = require('jsdom');

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Test Document</title>
</head>
<body>
    <img src="dark mode.png" id="mode" onclick="DarkMode()">
    <script>
        function DarkMode() {
            var mode = document.getElementById('mode');
            document.body.classList.toggle("dark-mode");
        
            var bgElements = document.getElementsByClassName('bg');
            
            if (document.body.classList.contains("dark-mode")) {
                mode.src = "light mode.png";
                for (var i = 0; i < bgElements.length; i++) {
                    bgElements[i].style.opacity = 0;
                }
            } else {
                mode.src = "dark mode.png";
                for (var i = 0; i < bgElements.length; i++) {
                    bgElements[i].style.opacity = 1;
                }
            }
        }
    </script>
</body>
</html>
`;

describe('DarkMode Function', function() {
    let dom;
    let document;
    let mode;

    beforeEach(function() {
        dom = new JSDOM(htmlContent, { runScripts: "dangerously" });
        document = dom.window.document;
        mode = document.getElementById('mode');
    });

    it('should toggle dark mode class on body', function() {
        assert.strictEqual(document.body.classList.contains('dark-mode'), false);

        mode.onclick();

        assert.strictEqual(document.body.classList.contains('dark-mode'), true);

        mode.onclick();

        assert.strictEqual(document.body.classList.contains('dark-mode'), false);
    });

    it('should change mode image source when toggled', function() {
        assert.strictEqual(mode.src, 'dark mode.png');

        mode.onclick();

        assert.strictEqual(mode.src, 'light mode.png');

        mode.onclick();

        assert.strictEqual(mode.src, 'dark mode.png');
    });
});
