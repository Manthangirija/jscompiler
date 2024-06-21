document.addEventListener("DOMContentLoaded", function() {
    var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      lineNumbers: true,
      mode: "javascript",
      theme: "default"
    });
  
    window.runCode = function() {
      const code = editor.getValue();
      try {
        // Clear previous output
        document.getElementById('output').textContent = '';
  
        // Create an iframe for isolated execution
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
  
        const iframeWindow = iframe.contentWindow;
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  
        iframeDocument.open();
        iframeDocument.write('<script>' + code + '<\/script>');
        iframeDocument.close();
  
        // Capture console.log output
        const consoleOutput = [];
        iframeWindow.console.log = function(msg) {
          consoleOutput.push(msg);
        };
  
        setTimeout(() => {
          document.getElementById('output').textContent = consoleOutput.join('\n');
          document.body.removeChild(iframe);
        }, 1000);
  
      } catch (e) {
        document.getElementById('output').textContent = 'Error: ' + e.message;
      }
    }
  });
  