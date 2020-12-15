# CS5310 Final Project Design
## Description:
For CS5310 Computer Graphics Final Project.
A 3D interaction game using the conception of Greeky Snake. Players will be immersed into
the green garden at night. They are free to walk and discover the sprites(randomly shaped and animal-textured geometries) then collect them.

Here are the design elements in our project meeting minimum requirements:
## one Canvas
There is a canvas rendering the 3D game scene.
## three 3D geometric shapes
There are cubes, spheres and torus shapes of 3D geometries for displaying sprites.
## One perspective projection
Directly use projection matrix in Three.js lib to calculate for camera transformation.
## One camera
One camera to display the view and operate control such as translation, rotation, angle and FOV for the geometries.
## Three Mesh objects
There are three 3D mesh objects including the trees, street lamps, bench, etc.
## Two Light Sources
Uses direction light to display moonlight and two point lightning to display street light.
## Three Textures
Loads three images from separate image files and uses them as textures on three different shapes.
## Three User Interactions
Trackball: use trackball to zoom in and zoom out the whole view.
Keyboard: use keyboard WASD to move the geometries.
Buttons: use buttons to move geometries, control camera and choose textures.
## Animations
The geometric sprites of different shapes all implement animation of rotation.

Following are the additional requirements satisfied:
## Shadows
There is a shadow of the bench implemented and projected into the surface of grass.
## Bump Maps
Utilizes one Bump Map on the bench.
## Animations
There are animations of rotation for 3D geometries of different shapes; a button to start/stop the animation.
## Textures
Buttons are added to select and apply data driven textures dynamically.