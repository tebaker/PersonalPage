// Vertex shader program
let TEX_VSHADER =
   `attribute vec4 a_Position;
   attribute vec2 a_TexCoord;
   varying vec2 v_TexCoord;
   void main() {
     gl_Position = a_Position;
     v_TexCoord = a_TexCoord;
   }`;

// Fragment shader program
let TEX_FSHADER =
   `#ifdef GL_ES
   precision mediump float;
   #endif
   uniform sampler2D u_Sampler;
   varying vec2 v_TexCoord;
   void main() {
     gl_FragColor = texture2D(u_Sampler, v_TexCoord);
   }`;