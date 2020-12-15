# CS5310 Final Project Design
## Description:
For CS5310 Computer Graphics Final Project.
A 3D interaction game using the conception of Greeky Snake. Players will be immersed into
the green garden at night. They are free to walk and discover the sprites(randomly shaped and animal-textured geometries) then collect them.

# Run local
Install node.js and run server.js in root. Use http://localhost:3000/index.html to open html.


Here are the design elements in our project meeting minimum requirements:
## one Canvas
There is a canvas rendering the 3D game scene.
## three 3D geometric shapes
There are cubes, spheres and torus shapes of 3D geometries for displaying sprites.
## One perspective projection
Directly use projection matrix in three.js lib javascript to calculate for camera transformation.
## One camera
One camera to display the view and operate control such as translation, rotation, and FOV for the scene.
## Three Mesh objects
There are three 3D mesh objects including the trees, street lamps, bench.
## Two Light Sources
Uses direction light to display moonlight and two point lightning to display street light.
## Three Textures
Loads three images from separate image files and uses them as textures on all geometries. 
User can apply different texture by clicking corresponding button in UI.
## Three User Interactions
Trackball: use trackball to zoom in and zoom out the whole view.
Keyboard: use keyboard WASD to move the geometries. And use QE to rotate camera.
Buttons: use buttons to move geometries, control camera, choose textures, and play/stop animation.

Following are the additional requirements satisfied:
## Shadows
There is a shadow of all objects implemented and projected into the surface of grass.
## Bump Maps
Utilizes Bump Map on the bench object.
## Animations
There are animations of rotation for 3D geometries of different shapes; a button to start/stop the animation.
## Textures
Buttons are added to select and apply data driven textures dynamically.
Data driven by replace function in main.js.
