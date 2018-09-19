import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map['.wasm'] = 'application/wasm'

try:
    httpd = socketserver.TCPServer(("localhost", PORT), Handler)
    print("serving at port", PORT)
    httpd.serve_forever()
    
finally:
    httpd.server_close()