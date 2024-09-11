// LittleJS - MIT License - Copyright 2021 Frank Force

'use strict';

/** 
 * LittleJS - Release Mode
 * - This file is used for release builds in place of engineDebug.js
 * - Debug functionality is disabled to reduce size and increase performance
 */



/**
 * LittleJS Utility Classes and Functions
 * - General purpose math library
 * - Vector2 - fast, simple, easy 2D vector class
 * - Color - holds a rgba color with some math functions
 * - Timer - tracks time automatically
 * - RandomGenerator - seeded random number generator
 * @namespace Utilities
 */



/** A shortcut to get Math.PI
 *  @type {Number}
 *  @default Math.PI
 *  @memberof Utilities */
const PI = Math.PI;

/** Returns absoulte value of value passed in
 *  @param {Number} value
 *  @return {Number}
 *  @memberof Utilities */
function abs(value) { return Math.abs(value); }

/** Returns lowest of two values passed in
 *  @param {Number} valueA
 *  @param {Number} valueB
 *  @return {Number}
 *  @memberof Utilities */
function min(valueA, valueB) { return Math.min(valueA, valueB); }

/** Returns highest of two values passed in
 *  @param {Number} valueA
 *  @param {Number} valueB
 *  @return {Number}
 *  @memberof Utilities */
function max(valueA, valueB) { return Math.max(valueA, valueB); }

/** Returns the sign of value passed in
 *  @param {Number} value
 *  @return {Number}
 *  @memberof Utilities */
function sign(value) { return Math.sign(value); }

/** Returns first parm modulo the second param, but adjusted so negative numbers work as expected
 *  @param {Number} dividend
 *  @param {Number} [divisor]
 *  @return {Number}
 *  @memberof Utilities */
function mod(dividend, divisor=1) { return ((dividend % divisor) + divisor) % divisor; }

/** Clamps the value beween max and min
 *  @param {Number} value
 *  @param {Number} [min]
 *  @param {Number} [max]
 *  @return {Number}
 *  @memberof Utilities */
function clamp(value, min=0, max=1) { return value < min ? min : value > max ? max : value; }

/** Returns what percentage the value is between valueA and valueB
 *  @param {Number} value
 *  @param {Number} valueA
 *  @param {Number} valueB
 *  @return {Number}
 *  @memberof Utilities */
function percent(value, valueA, valueB)
{ return valueB-valueA ? clamp((value-valueA) / (valueB-valueA)) : 0; }

/** Linearly interpolates between values passed in using percent
 *  @param {Number} percent
 *  @param {Number} valueA
 *  @param {Number} valueB
 *  @return {Number}
 *  @memberof Utilities */
function lerp(percent, valueA, valueB) { return valueA + clamp(percent) * (valueB-valueA); }

///////////////////////////////////////////////////////////////////////////////

/** Random global functions
 *  @namespace Random */

/** Returns a random value between the two values passed in
 *  @param {Number} [valueA]
 *  @param {Number} [valueB]
 *  @return {Number}
 *  @memberof Random */
function rand(valueA=1, valueB=0) { return valueB + Math.random() * (valueA-valueB); }

/** Returns a floored random value the two values passed in
 *  @param {Number} valueA
 *  @param {Number} [valueB]
 *  @return {Number}
 *  @memberof Random */
function randInt(valueA, valueB=0) { return Math.floor(rand(valueA,valueB)); }

///////////////////////////////////////////////////////////////////////////////

/** 
 * Create a 2d vector, can take another Vector2 to copy, 2 scalars, or 1 scalar
 * @param {(Number|Vector2)} [x]
 * @param {Number} [y]
 * @return {Vector2}
 * @example
 * let a = vec2(0, 1); // vector with coordinates (0, 1)
 * let b = vec2(a);    // copy a into b
 * a = vec2(5);        // set a to (5, 5)
 * b = vec2();         // set b to (0, 0)
 * @memberof Utilities
 */
function vec2(x=0, y)
{
    return typeof x === 'number' ? 
        new Vector2(x, y == undefined? x : y) : 
        new Vector2(x.x, x.y);
}

/** 
 * 2D Vector object with vector math library
 * - Functions do not change this so they can be chained together
 * @example
 * let a = new Vector2(2, 3); // vector with coordinates (2, 3)
 * let b = new Vector2;       // vector with coordinates (0, 0)
 * let c = vec2(4, 2);        // use the vec2 function to make a Vector2
 * let d = a.add(b).scale(5); // operators can be chained
 */
class Vector2
{
    /** Create a 2D vector with the x and y passed in, can also be created with vec2()
     *  @param {Number} [x] - X axis location
     *  @param {Number} [y] - Y axis location */
    constructor(x=0, y=0)
    {
        /** @property {Number} - X axis location */
        this.x = x;
        /** @property {Number} - Y axis location */
        this.y = y;
    }

    /** Returns a new vector that is a copy of this
     *  @return {Vector2} */
    copy() { return new Vector2(this.x, this.y); }

    /** Returns a copy of this vector plus the vector passed in
     *  @param {Vector2} v - other vector
     *  @return {Vector2} */
    add(v)
    {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    /** Returns a copy of this vector minus the vector passed in
     *  @param {Vector2} v - other vector
     *  @return {Vector2} */
    subtract(v)
    {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    /** Returns a copy of this vector times the vector passed in
     *  @param {Vector2} v - other vector
     *  @return {Vector2} */
    multiply(v)
    {
        return new Vector2(this.x * v.x, this.y * v.y);
    }

    /** Returns a copy of this vector divided by the vector passed in
     *  @param {Vector2} v - other vector
     *  @return {Vector2} */
    divide(v)
    {
        return new Vector2(this.x / v.x, this.y / v.y);
    }

    /** Returns a copy of this vector scaled by the vector passed in
     *  @param {Number} s - scale
     *  @return {Vector2} */
    scale(s)
    {
        return new Vector2(this.x * s, this.y * s);
    }

    /** Returns the length of this vector
     * @return {Number} */
    length() { return this.lengthSquared()**.5; }

    /** Returns the length of this vector squared
     * @return {Number} */
    lengthSquared() { return this.x**2 + this.y**2; }

    /** Returns the distance from this vector to vector passed in
     * @param {Vector2} v - other vector
     * @return {Number} */
    distance(v)
    {
        return this.distanceSquared(v)**.5;
    }

    /** Returns the distance squared from this vector to vector passed in
     * @param {Vector2} v - other vector
     * @return {Number} */
    distanceSquared(v)
    {
        return (this.x - v.x)**2 + (this.y - v.y)**2;
    }

    /** Returns a new vector in same direction as this one with the length passed in
     * @param {Number} [length]
     * @return {Vector2} */
    normalize(length=1)
    {
        const l = this.length();
        return l ? this.scale(length/l) : new Vector2(0, length);
    }

    /** Returns a new vector clamped to length passed in
     * @param {Number} [length]
     * @return {Vector2} */
    clampLength(length=1)
    {
        const l = this.length();
        return l > length ? this.scale(length/l) : this;
    }

    /** Returns the dot product of this and the vector passed in
     * @param {Vector2} v - other vector
     * @return {Number} */
    dot(v)
    {
        return this.x*v.x + this.y*v.y;
    }

    /** Returns the cross product of this and the vector passed in
     * @param {Vector2} v - other vector
     * @return {Number} */
    cross(v)
    {
        return this.x*v.y - this.y*v.x;
    }

    /** Returns the angle of this vector, up is angle 0
     * @return {Number} */
    angle() { return Math.atan2(this.x, this.y); }

    /** Sets this vector with angle and length passed in
     * @param {Number} [angle]
     * @param {Number} [length]
     * @return {Vector2} */
    setAngle(angle=0, length=1) 
    {
        this.x = length*Math.sin(angle);
        this.y = length*Math.cos(angle);
        return this;
    }

    /** Returns copy of this vector rotated by the angle passed in
     * @param {Number} angle
     * @return {Vector2} */
    rotate(angle)
    { 
        const c = Math.cos(angle), s = Math.sin(angle); 
        return new Vector2(this.x*c - this.y*s, this.x*s + this.y*c);
    }

    /** Returns the integer direction of this vector, corrosponding to multiples of 90 degree rotation (0-3)
     * @return {Number} */
    direction()
    { return abs(this.x) > abs(this.y) ? this.x < 0 ? 3 : 1 : this.y < 0 ? 2 : 0; }

    /** Returns a copy of this vector that has been inverted
     * @return {Vector2} */
    invert() { return new Vector2(this.y, -this.x); }

    /** Returns a copy of this vector with each axis floored
     * @return {Vector2} */
    floor() { return new Vector2(Math.floor(this.x), Math.floor(this.y)); }

    /** Returns the area this vector covers as a rectangle
     * @return {Number} */
    area() { return abs(this.x * this.y); }

    /** Returns a new vector that is p percent between this and the vector passed in
     * @param {Vector2} v - other vector
     * @param {Number}  percent
     * @return {Vector2} */
    lerp(v, percent)
    {
        return this.add(v.subtract(this).scale(clamp(percent)));
    }

    /** Returns true if this vector is within the bounds of an array size passed in
     * @param {Vector2} arraySize
     * @return {Boolean} */
    arrayCheck(arraySize)
    {
        return this.x >= 0 && this.y >= 0 && this.x < arraySize.x && this.y < arraySize.y;
    }

}

/** 
 * Color object (red, green, blue, alpha) with some helpful functions
 * @example
 * let a = new Color;              // white
 * let b = new Color(1, 0, 0);     // red
 * let c = new Color(0, 0, 0, 0);  // transparent black
 * let d = rgb(0, 0, 1);           // blue using rgb color
 * let e = hsl(.3, 1, .5);         // green using hsl color
 */
class Color
{
    /** Create a color with the rgba components passed in, white by default
     *  @param {Number} [r] - red
     *  @param {Number} [g] - green
     *  @param {Number} [b] - blue
     *  @param {Number} [a] - alpha*/
    constructor(r=1, g=1, b=1, a=1)
    {
        /** @property {Number} - Red */
        this.r = r;
        /** @property {Number} - Green */
        this.g = g;
        /** @property {Number} - Blue */
        this.b = b;
        /** @property {Number} - Alpha */
        this.a = a;
    }

    /** Returns a new color that is a copy of this
     * @return {Color} */
    copy() { return new Color(this.r, this.g, this.b, this.a); }


    /** Returns a copy of this color scaled by the value passed in, alpha can be scaled separately
     * @param {Number} scale
     * @param {Number} [alphaScale=scale]
     * @return {Color} */
    scale(scale, alphaScale=scale) 
    { return new Color(this.r*scale, this.g*scale, this.b*scale, this.a*alphaScale); }

    /** Returns a copy of this color clamped to the valid range between 0 and 1
     * @return {Color} */
    clamp() { return new Color(clamp(this.r), clamp(this.g), clamp(this.b), clamp(this.a)); }

 
    /** Returns this color expressed as 32 bit RGBA value
     * @return {Number} */
    rgbaInt()  
    {
        const r = clamp(this.r)*255|0;
        const g = clamp(this.g)*255<<8;
        const b = clamp(this.b)*255<<16;
        const a = clamp(this.a)*255<<24;
        return r + g + b + a;
    }
}

///////////////////////////////////////////////////////////////////////////////

/**
 * Timer object tracks how long has passed since it was set
 * @example
 * let a = new Timer;    // creates a timer that is not set
 * a.set(3);             // sets the timer to 3 seconds
 *
 * let b = new Timer(1); // creates a timer with 1 second left
 * b.unset();            // unsets the timer
 */
class Timer
{
    /** Create a timer object set time passed in
     *  @param {Number} [timeLeft] - How much time left before the timer elapses in seconds */
    constructor(timeLeft) { this.time = timeLeft == undefined ? undefined : time + timeLeft; this.setTime = timeLeft; }

    /** Set the timer with seconds passed in
     *  @param {Number} [timeLeft] - How much time left before the timer is elapsed in seconds */
    set(timeLeft=0) { this.time = time + timeLeft; this.setTime = timeLeft; }

    /** Unset the timer */
    unset() { this.time = undefined; }

    /** Returns true if set
     * @return {Boolean} */
    isSet() { return this.time != undefined; }

    /** Returns true if set and has not elapsed
     * @return {Boolean} */
    active() { return time <= this.time; }

    /** Returns true if set and elapsed
     * @return {Boolean} */
    elapsed() { return time > this.time; }

    /** Get how long since elapsed, returns 0 if not set (returns negative if currently active)
     * @return {Number} */
    get() { return this.isSet()? time - this.time : 0; }

    /** Get percentage elapsed based on time it was set to, returns 0 if not set
     * @return {Number} */
    getPercent() { return this.isSet()? percent(this.time - time, this.setTime, 0) : 0; }
       
    /** Get how long since elapsed, returns 0 if not set (returns negative if currently active)
     * @return {Number} */
    valueOf()               { return this.get(); }
}
/**
 * LittleJS Engine Settings
 * - All settings for the engine are here
 * @namespace Settings
 */



///////////////////////////////////////////////////////////////////////////////
// Camera settings

/** Position of camera in world space
 *  @type {Vector2}
 *  @default Vector2()
 *  @memberof Settings */
let cameraPos = vec2();

/** Scale of camera in world space
 *  @type {Number}
 *  @default
 *  @memberof Settings */
let cameraScale = 32;

///////////////////////////////////////////////////////////////////////////////
// Display settings

/** The max size of the canvas, centered if window is larger
 *  @type {Vector2}
 *  @default Vector2(1920,1200)
 *  @memberof Settings */
let canvasMaxSize = vec2(1920, 1200);

/** Fixed size of the canvas, if enabled canvas size never changes
 * - you may also need to set mainCanvasSize if using screen space coords in startup
 *  @type {Vector2}
 *  @default Vector2()
 *  @memberof Settings */
let canvasFixedSize = vec2();

/** Disables filtering for crisper pixel art if true
 *  @type {Boolean}
 *  @default
 *  @memberof Settings */
let canvasPixelated = true;

/** Default font used for text rendering
 *  @type {String}
 *  @default
 *  @memberof Settings */
let fontDefault = 'arial';

///////////////////////////////////////////////////////////////////////////////
// WebGL settings

/** Fixes slow rendering in some browsers by not compositing the WebGL canvas
 *  @type {Boolean}
 *  @default
 *  @memberof Settings */
let glOverlay = true;

///////////////////////////////////////////////////////////////////////////////
// Tile sheet settings

/** Default size of tiles in pixels
 *  @type {Vector2}
 *  @default Vector2(16,16)
 *  @memberof Settings */
let tileSizeDefault = vec2(12);

/** How many pixels smaller to draw tiles to prevent bleeding from neighbors
 *  @type {Number}
 *  @default
 *  @memberof Settings */
let tileFixBleedScale = .1;


///////////////////////////////////////////////////////////////////////////////
// Audio settings

/** All audio code can be disabled and removed from build
 *  @type {Boolean}
 *  @default
 *  @memberof Settings */
let soundEnable = true;

/** Volume scale to apply to all sound, music and speech
 *  @type {Number}
 *  @default
 *  @memberof Settings */
let soundVolume = .5;

/** Default range where sound no longer plays
 *  @type {Number}
 *  @default
 *  @memberof Settings */
let soundDefaultRange = 40;

/** Default range percent to start tapering off sound (0-1)
 *  @type {Number}
 *  @default
 *  @memberof Settings */
let soundDefaultTaper = .7;


/** 
 * LittleJS Object System
 */



/** 
 * LittleJS Object Base Object Class
 * - Top level object class used by the engine
 * - Automatically adds self to object list
 * - Will be updated and rendered each frame
 * - Renders as a sprite from a tilesheet by default
 * - Can have color and additive color applied
 * - 2D Physics and collision system
 * - Sorted by renderOrder
 * - Objects can have children attached
 * - Parents are updated before children, and set child transform
 * - Call destroy() to get rid of objects
 *
 * The physics system used by objects is simple and fast with some caveats...
 * - Collision uses the axis aligned size, the object's rotation angle is only for rendering
 * - Objects are guaranteed to not intersect tile collision from physics
 * - If an object starts or is moved inside tile collision, it will not collide with that tile
 * - Collision for objects can be set to be solid to block other objects
 * - Objects may get pushed into overlapping other solid objects, if so they will push away
 * - Solid objects are more performance intensive and should be used sparingly
 * @example
 * // create an engine object, normally you would first extend the class with your own
 * const pos = vec2(2,3);
 * const object = new EngineObject(pos); 
 */
class EngineObject
{
    /** Create an engine object and adds it to the list of objects
     *  @param {Vector2}  [pos=(0,0)]       - World space position of the object
     *  @param {Vector2}  [size=(1,1)]      - World space size of the object
     *  @param {TileInfo} [tileInfo]        - Tile info to render object (undefined is untextured)
     *  @param {Number}   [angle]           - Angle the object is rotated by
     *  @param {Color}    [color=(1,1,1,1)] - Color to apply to tile when rendered
     *  @param {Number}   [renderOrder]     - Objects sorted by renderOrder before being rendered
     */
    constructor(pos=vec2(), size=vec2(1), tileInfo, angle=0, color, renderOrder=0)
    {
        // set passed in params
        /** @property {Vector2} - World space position of the object */
        this.pos = pos.copy();
        /** @property {Vector2} - World space width and height of the object */
        this.size = size;
        /** @property {Vector2} - Size of object used for drawing, uses size if not set */
        this.drawSize = undefined;
        /** @property {TileInfo} - Tile info to render object (undefined is untextured) */
        this.tileInfo = tileInfo;
        /** @property {Number}  - Angle to rotate the object */
        this.angle = angle;
        /** @property {Color}   - Color to apply when rendered */
        this.color = color;
        /** @property {Color}   - Additive color to apply when rendered */
        this.additiveColor = undefined;
        /** @property {Boolean} - Should it flip along y axis when rendered */
        this.mirror = false;

        // physical properties
        /** @property {Number}  - Objects are sorted by render order */
        this.renderOrder = renderOrder;

        // add to list of objects
        engineObjects.push(this);
    }
    
    /** Update the object transform and physics, called automatically by engine once each frame */
    update()
    {
        return;
    }
       
    /** Render the object, draws a tile by default, automatically called each frame, sorted by renderOrder */
    render()
    {
        // default object render
        drawTile(this.pos, this.drawSize || this.size, this.tileInfo, this.color, this.angle, this.mirror, this.additiveColor);
    }
    
    /** Destroy this object, destroy it's children, detach it's parent, and mark it for removal */
    destroy()
    { 
        if (this.destroyed)
            return;
        
        // disconnect from parent and destroy chidren
        this.destroyed = 1;
    }
     
    /** Get the direction of the mirror
     *  @return {Number} -1 if this.mirror is true, or 1 if not mirrored */
    getMirrorSign() { return this.mirror ? -1 : 1; }


}
/** 
 * LittleJS Drawing System
 * - Hybrid system with both Canvas2D and WebGL available
 * - Super fast tile sheet rendering with WebGL
 * - Can apply rotation, mirror, color and additive color
 * - Font rendering system with built in engine font
 * - Many useful utility functions
 * 
 * LittleJS uses a hybrid rendering solution with the best of both Canvas2D and WebGL.
 * There are 3 canvas/contexts available to draw to...
 * mainCanvas - 2D background canvas, non WebGL stuff like tile layers are drawn here.
 * glCanvas - Used by the accelerated WebGL batch rendering system.
 * overlayCanvas - Another 2D canvas that appears on top of the other 2 canvases.
 * 
 * The WebGL rendering system is very fast with some caveats...
 * - Switching blend modes (additive) or textures causes another draw call which is expensive in excess
 * - Group additive rendering together using renderOrder to mitigate this issue
 * 
 * The LittleJS rendering solution is intentionally simple, feel free to adjust it for your needs!
 * @namespace Draw
 */



/** The primary 2D canvas visible to the user
 *  @type {HTMLCanvasElement}
 *  @memberof Draw */
let mainCanvas;

/** 2d context for mainCanvas
 *  @type {CanvasRenderingContext2D}
 *  @memberof Draw */
let mainContext;

/** A canvas that appears on top of everything the same size as mainCanvas
 *  @type {HTMLCanvasElement}
 *  @memberof Draw */
let overlayCanvas;

/** 2d context for overlayCanvas
 *  @type {CanvasRenderingContext2D}
 *  @memberof Draw */
let overlayContext;

/** The size of the main canvas (and other secondary canvases) 
 *  @type {Vector2}
 *  @memberof Draw */
let mainCanvasSize = vec2();

/** Array containing texture info for batch rendering system
 *  @type {Array}
 *  @memberof Draw */
let textureInfos = [];

// Keep track of how many draw calls there were each frame for debugging
let drawCount;

///////////////////////////////////////////////////////////////////////////////

/** 
 * Create a tile info object
 * - This can take vecs or floats for easier use and conversion
 * - If an index is passed in, the tile size and index will determine the position
 * @param {(Number|Vector2)} [pos=(0,0)]            - Top left corner of tile in pixels or index
 * @param {(Number|Vector2)} [size=tileSizeDefault] - Size of tile in pixels
 * @param {Number} [textureIndex]                   - Texture index to use
 * @return {TileInfo}
 * @example
 * tile(2)                       // a tile at index 2 using the default tile size of 16
 * tile(5, 8)                    // a tile at index 5 using a tile size of 8
 * tile(1, 16, 3)                // a tile at index 1 of size 16 on texture 3
 * tile(vec2(4,8), vec2(30,10))  // a tile at pixel location (4,8) with a size of (30,10)
 * @memberof Draw
 */
function tile(pos=vec2(), size=tileSizeDefault, textureIndex=0)
{
    // if size is a number, make it a vector
    if (typeof size === 'number')
    {
        size = vec2(size);
    }

    // if pos is a number, use it as a tile index
    if (typeof pos === 'number')
    {
        const textureInfo = textureInfos[textureIndex];
        const cols = textureInfo.size.x / size.x |0;
        pos = vec2((pos%cols)*size.x, (pos/cols|0)*size.y);
    }

    // return a tile info object
    return new TileInfo(pos, size, textureIndex); 
}

/** 
 * Tile Info - Stores info about how to draw a tile
 */
class TileInfo
{
    /** Create a tile info object
     *  @param {Vector2} [pos=(0,0)]            - Top left corner of tile in pixels
     *  @param {Vector2} [size=tileSizeDefault] - Size of tile in pixels
     *  @param {Number}  [textureIndex]         - Texture index to use
     */
    constructor(pos=vec2(), size=tileSizeDefault, textureIndex=0)
    {
        /** @property {Vector2} - Top left corner of tile in pixels */
        this.pos = pos;
        /** @property {Vector2} - Size of tile in pixels */
        this.size = size;
        /** @property {Number} - Texture index to use */
        this.textureIndex = textureIndex;
    }

    /** Returns a copy of this tile offset by a vector
    *  @param {Vector2} offset - Offset to apply in pixels
    *  @return {TileInfo}
    */
    offset(offset)
    { return new TileInfo(this.pos.add(offset), this.size, this.textureIndex); }

    /** Returns a copy of this tile offset by a number of animation frames
    *  @param {Number} frame - Offset to apply in animation frames
    *  @return {TileInfo}
    */
    frame(frame)
    {
        return this.offset(vec2(frame*this.size.x, 0));
    }

    /** Returns the texture info for this tile
    *  @return {TextureInfo}
    */
    getTextureInfo()
    { return textureInfos[this.textureIndex]; }
}

/** Texture Info - Stores info about each texture */
class TextureInfo
{
    /**
     * Create a TextureInfo, called automatically by the engine
     * @param {HTMLImageElement} image
     */
    constructor(image)
    {
        /** @property {HTMLImageElement} - image source */
        this.image = image;
        /** @property {Vector2} - size of the image */
        this.size = vec2(image.width, image.height);
        /** @property {WebGLTexture} - webgl texture */
        this.glTexture = glCreateTexture(image);
        /** @property {Vector2} - size to adjust tile to fix bleeding */
        this.fixBleedSize = vec2(tileFixBleedScale).divide(this.size);
    }
}

///////////////////////////////////////////////////////////////////////////////

/** Convert from screen to world space coordinates
 *  @param {Vector2} screenPos
 *  @return {Vector2}
 *  @memberof Draw */
function screenToWorld(screenPos)
{
    return new Vector2
    (
        (screenPos.x - mainCanvasSize.x/2 + .5) /  cameraScale + cameraPos.x,
        (screenPos.y - mainCanvasSize.y/2 + .5) / -cameraScale + cameraPos.y
    );
}

/** Convert from world to screen space coordinates
 *  @param {Vector2} worldPos
 *  @return {Vector2}
 *  @memberof Draw */
function worldToScreen(worldPos)
{
    return new Vector2
    (
        (worldPos.x - cameraPos.x) *  cameraScale + mainCanvasSize.x/2 - .5,
        (worldPos.y - cameraPos.y) * -cameraScale + mainCanvasSize.y/2 - .5
    );
}

/** Draw textured tile centered in world space, with color applied if using WebGL
 *  @param {Vector2} pos                        - Center of the tile in world space
 *  @param {Vector2} [size=(1,1)]               - Size of the tile in world space
 *  @param {TileInfo}[tileInfo]                 - Tile info to use, untextured if undefined
 *  @param {Color}   [color=(1,1,1,1)]          - Color to modulate with
 *  @param {Number}  [angle]                    - Angle to rotate by
 *  @param {Boolean} [mirror]                   - If true image is flipped along the Y axis
 *  @param {Color}   [additiveColor=(0,0,0,0)]  - Additive color to be applied
 *  @param {Boolean} [useWebGL=glEnable]        - Use accelerated WebGL rendering
 *  @param {Boolean} [screenSpace=false]        - If true the pos and size are in screen space
 *  @param {CanvasRenderingContext2D} [context] - Canvas 2D context to draw to
 *  @memberof Draw */
function drawTile(pos, size=vec2(1), tileInfo, color=new Color,
    angle=0, mirror, additiveColor=new Color(0,0,0,0), screenSpace, context)
{
    const textureInfo = tileInfo && tileInfo.getTextureInfo();
    if (screenSpace)
    {
        // convert to world space
        pos = screenToWorld(pos);
        size = size.scale(1/cameraScale);
    }
    
    if (textureInfo)
    {
        // calculate uvs and render
        const x = tileInfo.pos.x / textureInfo.size.x;
        const y = tileInfo.pos.y / textureInfo.size.y;
        const w = tileInfo.size.x / textureInfo.size.x;
        const h = tileInfo.size.y / textureInfo.size.y;
        const tileImageFixBleed = textureInfo.fixBleedSize;
        glSetTexture(textureInfo.glTexture);
        glDraw(pos.x, pos.y, mirror ? -size.x : size.x, size.y, angle, 
            x + tileImageFixBleed.x,     y + tileImageFixBleed.y, 
            x - tileImageFixBleed.x + w, y - tileImageFixBleed.y + h, 
            color.rgbaInt(), additiveColor.rgbaInt()); 
    }
    else
    {
        // if no tile info, force untextured
        glDraw(pos.x, pos.y, size.x, size.y, angle, 0, 0, 0, 0, 0, color.rgbaInt()); 
    }
 
}

/** Draw colored rect centered on pos
 *  @param {Vector2} pos
 *  @param {Vector2} [size=(1,1)]
 *  @param {Color}   [color=(1,1,1,1)]
 *  @param {Number}  [angle]
 *  @param {Boolean} [useWebGL=glEnable]
 *  @param {Boolean} [screenSpace=false]
 *  @param {CanvasRenderingContext2D} [context]
 *  @memberof Draw */
function drawRect(pos, size, color, angle, screenSpace, context)
{ 
    drawTile(pos, size, undefined, color, angle, false, undefined, screenSpace, context); 
}


/** 
 * Font Image Object - Draw text on a 2D canvas by using characters in an image
 * - 96 characters (from space to tilde) are stored in an image
 * - Uses a default 8x8 font if none is supplied
 * - You can also use fonts from the main tile sheet
 * @example
 * // use built in font
 * const font = new ImageFont;
 * 
 * // draw text
 * font.drawTextScreen("LittleJS\nHello World!", vec2(200, 50));
 */
class FontImage
{
    /** Create an image font
     *  @param {HTMLImageElement} [image]    - Image for the font, if undefined default font is used
    */
    constructor(image)
    {
       this.image = image;
        this.tileSize = vec2(6);
        this.paddingSize = vec2(1);
        this.context = overlayContext;
    }

    /** Draw text in world space using the image font
     *  @param {String}  text
     *  @param {Vector2} pos
     *  @param {Number}  [scale=.25]
     *  @param {Boolean} [center]
     */
    drawText(text, pos, scale=1, center)
    {
        this.drawTextScreen(text, worldToScreen(pos).floor(), scale*cameraScale|0, center);
    }

    /** Draw text in screen space using the image font
     *  @param {String}  text
     *  @param {Vector2} pos
     *  @param {Number}  [scale]
     *  @param {Boolean} [center]
     */
    drawTextScreen(text, pos, scale=4, center)
    {
        const context = this.context;
        context.save();
        context.imageSmoothingEnabled = !canvasPixelated;

        const size = this.tileSize;
        const drawSize = size.add(this.paddingSize).scale(scale);
        const cols = this.image.width / this.tileSize.x |0;
        (text+'').split('\n').forEach((line, i)=>
        {
            const centerOffset = center ? line.length * size.x * scale / 2 |0 : 0;
            for(let j=line.length; j--;)
            {
                // draw each character
                let charCode = line[j].charCodeAt(0);
                if (charCode < 32 || charCode > 127)
                    charCode = 127; // unknown character

                // get the character source location and draw it
                const tile = charCode - 32;
                const x = tile % cols;
                const y = tile / cols |0;
                const drawPos = pos.add(vec2(j,i).multiply(drawSize));
                context.drawImage(this.image, x * size.x, y * size.y, size.x, size.y, 
                    drawPos.x - centerOffset, drawPos.y, size.x * scale, size.y * scale);
            }
        });

        context.restore();
    }
}


/** Returns true if device key is down
 *  @param {String|Number} key
 *  @param {Number} [device]
 *  @return {Boolean}
 *  @memberof Input */
function keyIsDown(key, device=0)
{ 
    return inputData[device] && !!(inputData[device][key] & 1); 
}

/** Returns true if device key was pressed this frame
 *  @param {String|Number} key
 *  @param {Number} [device]
 *  @return {Boolean}
 *  @memberof Input */
function keyWasPressed(key, device=0)
{ 
    return inputData[device] && !!(inputData[device][key] & 2); 
}

/** Returns true if device key was released this frame
 *  @param {String|Number} key
 *  @param {Number} [device]
 *  @return {Boolean}
 *  @memberof Input */
function keyWasReleased(key, device=0)
{ 
    return inputData[device] && !!(inputData[device][key] & 4);
}

/** Clears all input
 *  @memberof Input */
function clearInput() { inputData = [[]]; }

/** Returns true if mouse button is down
 *  @function
 *  @param {Number} button
 *  @return {Boolean}
 *  @memberof Input */
const mouseIsDown = keyIsDown;

/** Returns true if mouse button was pressed
 *  @function
 *  @param {Number} button
 *  @return {Boolean}
 *  @memberof Input */
const mouseWasPressed = keyWasPressed;

/** Returns true if mouse button was released
 *  @function
 *  @param {Number} button
 *  @return {Boolean}
 *  @memberof Input */
const mouseWasReleased = keyWasReleased;

/** Mouse pos in world space
 *  @type {Vector2}
 *  @memberof Input */
let mousePos = vec2();

/** Mouse pos in screen space
 *  @type {Vector2}
 *  @memberof Input */
let mousePosScreen = vec2();

/** Prevents input continuing to the default browser handling (false by default)
 *  @type {Boolean}
 *  @memberof Input */
let preventDefaultInput = false;


///////////////////////////////////////////////////////////////////////////////
// Input update called by engine

// store input as a bit field for each key: 1 = isDown, 2 = wasPressed, 4 = wasReleased
// mouse and keyboard are stored together in device 0, gamepads are in devices > 0
let inputData = [[]];

function inputUpdate()
{
    // clear input when lost focus (prevent stuck keys)
    isTouchDevice || document.hasFocus() || clearInput();

    // update mouse world space position
    mousePos = screenToWorld(mousePosScreen);

    // update gamepads if enabled
    //gamepadsUpdate();
}

function inputUpdatePost()
{
    // clear input to prepare for next frame
    for (const deviceInputData of inputData)
    for (const i in deviceInputData)
        deviceInputData[i] &= 1;
}


///////////////////////////////////////////////////////////////////////////////
// Mouse event handlers

onmousedown = (e)=> {inputData[0][e.button] = 3; mousePosScreen = mouseToScreen(e); e.button && e.preventDefault();}
onmouseup   = (e)=> inputData[0][e.button] = inputData[0][e.button] & 2 | 4;
onmousemove = (e)=> mousePosScreen = mouseToScreen(e);
oncontextmenu = (e)=> false; // prevent right click menu

// convert a mouse or touch event position to screen space
function mouseToScreen(mousePos)
{
    if (!mainCanvas)
        return vec2(); // fix bug that can occur if user clicks before page loads

    const rect = mainCanvas.getBoundingClientRect();
    return vec2(mainCanvas.width, mainCanvas.height).multiply(
        vec2(percent(mousePos.x, rect.left, rect.right), percent(mousePos.y, rect.top, rect.bottom)));
}


///////////////////////////////////////////////////////////////////////////////
// Touch input

/** True if a touch device has been detected
 *  @memberof Input */
const isTouchDevice = window.ontouchstart !== undefined;

// try to enable touch mouse
if (isTouchDevice)
{
    // override mouse events
    let wasTouching;
    onmousedown = onmouseup = ()=> 0;

    // handle all touch events the same way
    ontouchstart = ontouchmove = ontouchend = (e)=>
    {
        // fix stalled audio requiring user interaction
        if (soundEnable && audioContext && audioContext.state != 'running')
            zzfx(0);

        // check if touching and pass to mouse events
        const touching = e.touches.length;
        const button = 0; // all touches are left mouse button
        if (touching)
        {
            // set event pos and pass it along
            const p = vec2(e.touches[0].clientX, e.touches[0].clientY);
            mousePosScreen = mouseToScreen(p);
            if (!wasTouching) inputData[0][button] = 3;
        }
        else if (wasTouching)
            inputData[0][button] = inputData[0][button] & 2 | 4;

        // set was touching
        wasTouching = touching;

        // prevent default handling like copy and magnifier lens
        if (document.hasFocus()) // allow document to get focus
            e.preventDefault();
        
        // must return true so the document will get focus
        return true;
    }
}

/** 
 * LittleJS Audio System
 * - <a href=https://killedbyapixel.github.io/ZzFX/>ZzFX Sound Effects</a> - ZzFX Sound Effect Generator
 * - <a href=https://keithclark.github.io/ZzFXM/>ZzFXM Music</a> - ZzFXM Music System
 * - Caches sounds and music for fast playback
 * - Can attenuate and apply stereo panning to sounds
 * - Ability to play mp3, ogg, and wave files
 * - Speech synthesis functions
 * @namespace Audio
 */



/** 
 * Sound Object - Stores a sound for later use and can be played positionally
 * 
 * <a href=https://killedbyapixel.github.io/ZzFX/>Create sounds using the ZzFX Sound Designer.</a>
 * @example
 * // create a sound
 * const sound_example = new Sound([.5,.5]);
 * 
 * // play the sound
 * sound_example.play();
 */
class Sound
{
    /** Create a sound object and cache the zzfx samples for later use
     *  @param {Array}  zzfxSound - Array of zzfx parameters, ex. [.5,.5]
     *  @param {Number} [range=soundDefaultRange] - World space max range of sound, will not play if camera is farther away
     *  @param {Number} [taper=soundDefaultTaper] - At what percentage of range should it start tapering
     */
    constructor(zzfxSound, range=soundDefaultRange, taper=soundDefaultTaper)
    {
        if (!soundEnable) return;

        /** @property {Number} - World space max range of sound, will not play if camera is farther away */
        this.range = range;

        /** @property {Number} - At what percentage of range should it start tapering off */
        this.taper = taper;

        /** @property {Number} - How much to randomize frequency each time sound plays */
        this.randomness = 0;

        if (zzfxSound)
        {
            // generate zzfx sound now for fast playback
            this.randomness = zzfxSound[1] || 0;
            zzfxSound[1] = 0; // generate without randomness
            this.sampleChannels = [zzfxG(...zzfxSound)];
            this.sampleRate = zzfxR;
        }
    }

    /** Play the sound
     *  @param {Vector2} [pos] - World space position to play the sound, sound is not attenuated if null
     *  @param {Number}  [volume] - How much to scale volume by (in addition to range fade)
     *  @param {Number}  [pitch] - How much to scale pitch by (also adjusted by this.randomness)
     *  @param {Number}  [randomnessScale] - How much to scale randomness
     *  @param {Boolean} [loop] - Should the sound loop
     *  @return {AudioBufferSourceNode} - The audio source node
     */
    play(pos, volume=1, pitch=1, randomnessScale=1, loop=false)
    {
        if (!soundEnable || !this.sampleChannels) return;

        let pan;
        if (pos)
        {
            const range = this.range;
            if (range)
            {
                // apply range based fade
                const lengthSquared = cameraPos.distanceSquared(pos);
                if (lengthSquared > range*range)
                    return; // out of range

                // attenuate volume by distance
                volume *= percent(lengthSquared**.5, range, range*this.taper);
            }

            // get pan from screen space coords
            pan = worldToScreen(pos).x * 2/mainCanvas.width - 1;
        }

        // play the sound
        const playbackRate = pitch + pitch * this.randomness*randomnessScale*rand(-1,1);
        return this.source = playSamples(this.sampleChannels, volume, playbackRate, pan, loop, this.sampleRate);
    }

    /** Stop the last instance of this sound that was played */
    stop()
    {
        if (this.source)
            this.source.stop();
        this.source = undefined;
    }
    
    /** Get source of most recent instance of this sound that was played
     *  @return {AudioBufferSourceNode}
     */
    getSource() { return this.source; }

    /** Play the sound as a note with a semitone offset
     *  @param {Number}  semitoneOffset - How many semitones to offset pitch
     *  @param {Vector2} [pos] - World space position to play the sound, sound is not attenuated if null
     *  @param {Number}  [volume=1] - How much to scale volume by (in addition to range fade)
     *  @return {AudioBufferSourceNode} - The audio source node
     */
    playNote(semitoneOffset, pos, volume)
    { return this.play(pos, volume, 2**(semitoneOffset/12), 0); }

    /** Get how long this sound is in seconds
     *  @return {Number} - How long the sound is in seconds (undefined if loading)
     */
    getDuration() 
    { return this.sampleChannels && this.sampleChannels[0].length / this.sampleRate; }
    
    /** Check if sound is loading, for sounds fetched from a url
     *  @return {Boolean} - True if sound is loading and not ready to play
     */
    isLoading() { return !this.sampleChannels; }
}


/**
 * Music Object - Stores a zzfx music track for later use
 * 
 * <a href=https://keithclark.github.io/ZzFXM/>Create music with the ZzFXM tracker.</a>
 * @example
 * // create some music
 * const music_example = new Music(
 * [
 *     [                         // instruments
 *       [,0,400]                // simple note
 *     ], 
 *     [                         // patterns
 *         [                     // pattern 1
 *             [                 // channel 0
 *                 0, -1,        // instrument 0, left speaker
 *                 1, 0, 9, 1    // channel notes
 *             ], 
 *             [                 // channel 1
 *                 0, 1,         // instrument 0, right speaker
 *                 0, 12, 17, -1 // channel notes
 *             ]
 *         ],
 *     ],
 *     [0, 0, 0, 0], // sequence, play pattern 0 four times
 *     90            // BPM
 * ]);
 * 
 * // play the music
 * music_example.play();
 */
class Music extends Sound
{
    /** Create a music object and cache the zzfx music samples for later use
     *  @param {[Array, Array, Array, Number]} zzfxMusic - Array of zzfx music parameters
     */
    constructor(zzfxMusic)
    {
        super(undefined);

        if (!soundEnable) return;
        this.randomness = 0;
        this.sampleChannels = zzfxM(...zzfxMusic);
        this.sampleRate = zzfxR;
    }

    /** Play the music
     *  @param {Number}  [volume=1] - How much to scale volume by
     *  @param {Boolean} [loop] - True if the music should loop
     *  @return {AudioBufferSourceNode} - The audio source node
     */
    playMusic(volume, loop=false)
    { return super.play(undefined, volume, 1, 1, loop); }
}


/** Get frequency of a note on a musical scale
 *  @param {Number} semitoneOffset - How many semitones away from the root note
 *  @param {Number} [rootFrequency=220] - Frequency at semitone offset 0
 *  @return {Number} - The frequency of the note
 *  @memberof Audio */
function getNoteFrequency(semitoneOffset, rootFrequency=220)
{ return rootFrequency * 2**(semitoneOffset/12); }

///////////////////////////////////////////////////////////////////////////////

/** Audio context used by the engine
 *  @type {AudioContext}
 *  @memberof Audio */
let audioContext = new AudioContext;

/** Keep track if audio was suspended when last sound was played
 *  @type {Boolean}
 *  @memberof Audio */
let audioSuspended = false;

/** Play cached audio samples with given settings
 *  @param {Array}   sampleChannels - Array of arrays of samples to play (for stereo playback)
 *  @param {Number}  [volume] - How much to scale volume by
 *  @param {Number}  [rate] - The playback rate to use
 *  @param {Number}  [pan] - How much to apply stereo panning
 *  @param {Boolean} [loop] - True if the sound should loop when it reaches the end
 *  @param {Number}  [sampleRate=44100] - Sample rate for the sound
 *  @return {AudioBufferSourceNode} - The audio node of the sound played
 *  @memberof Audio */
function playSamples(sampleChannels, volume=1, rate=1, pan=0, loop=false, sampleRate=zzfxR) 
{
    if (!soundEnable) return;

    // prevent sounds from building up if they can't be played
    const audioWasSuspended = audioSuspended;
    if (audioSuspended = audioContext.state != 'running')
    {
        // fix stalled audio
        audioContext.resume();

        // prevent suspended sounds from building up
        if (audioWasSuspended)
            return;
    }

    // create buffer and source
    const buffer = audioContext.createBuffer(sampleChannels.length, sampleChannels[0].length, sampleRate), 
        source = audioContext.createBufferSource();

    // copy samples to buffer and setup source
    sampleChannels.forEach((c,i)=> buffer.getChannelData(i).set(c));
    source.buffer = buffer;
    source.playbackRate.value = rate;
    source.loop = loop;

    // create and connect gain node (createGain is more widely spported then GainNode construtor)
    const gainNode = audioContext.createGain();
    gainNode.gain.value = soundVolume*volume;
    gainNode.connect(audioContext.destination);

    // connect source to stereo panner and gain
    source.connect(new StereoPannerNode(audioContext, {'pan':clamp(pan, -1, 1)})).connect(gainNode);

    // play and return sound
    source.start();
    return source;
}

///////////////////////////////////////////////////////////////////////////////
// ZzFXMicro - Zuper Zmall Zound Zynth - v1.3.1 by Frank Force

/** Generate and play a ZzFX sound
 *  
 *  <a href=https://killedbyapixel.github.io/ZzFX/>Create sounds using the ZzFX Sound Designer.</a>
 *  @param {Array} zzfxSound - Array of ZzFX parameters, ex. [.5,.5]
 *  @return {AudioBufferSourceNode} - The audio node of the sound played
 *  @memberof Audio */
function zzfx(...zzfxSound) { return playSamples([zzfxG(...zzfxSound)]); }

/** Sample rate used for all ZzFX sounds
 *  @default 44100
 *  @memberof Audio */
const zzfxR = 44100; 

/** Generate samples for a ZzFX sound
 *  @param {Number}  [volume] - Volume scale (percent)
 *  @param {Number}  [randomness] - How much to randomize frequency (percent Hz)
 *  @param {Number}  [frequency] - Frequency of sound (Hz)
 *  @param {Number}  [attack] - Attack time, how fast sound starts (seconds)
 *  @param {Number}  [sustain] - Sustain time, how long sound holds (seconds)
 *  @param {Number}  [release] - Release time, how fast sound fades out (seconds)
 *  @param {Number}  [shape] - Shape of the sound wave
 *  @param {Number}  [shapeCurve] - Squarenes of wave (0=square, 1=normal, 2=pointy)
 *  @param {Number}  [slide] - How much to slide frequency (kHz/s)
 *  @param {Number}  [deltaSlide] - How much to change slide (kHz/s/s)
 *  @param {Number}  [pitchJump] - Frequency of pitch jump (Hz)
 *  @param {Number}  [pitchJumpTime] - Time of pitch jump (seconds)
 *  @param {Number}  [repeatTime] - Resets some parameters periodically (seconds)
 *  @param {Number}  [noise] - How much random noise to add (percent)
 *  @param {Number}  [modulation] - Frequency of modulation wave, negative flips phase (Hz)
 *  @param {Number}  [bitCrush] - Resamples at a lower frequency in (samples*100)
 *  @param {Number}  [delay] - Overlap sound with itself for reverb and flanger effects (seconds)
 *  @param {Number}  [sustainVolume] - Volume level for sustain (percent)
 *  @param {Number}  [decay] - Decay time, how long to reach sustain after attack (seconds)
 *  @param {Number}  [tremolo] - Trembling effect, rate controlled by repeat time (precent)
 *  @param {Number}  [filter] - Filter cutoff frequency, positive for HPF, negative for LPF (Hz)
 *  @return {Array} - Array of audio samples
 *  @memberof Audio
 */
function zzfxG
(
    // parameters
    volume = 1, randomness = .05, frequency = 220, attack = 0, sustain = 0,
    release = .1, shape = 0, shapeCurve = 1, slide = 0, deltaSlide = 0,
    pitchJump = 0, pitchJumpTime = 0, repeatTime = 0, noise = 0, modulation = 0,
    bitCrush = 0, delay = 0, sustainVolume = 1, decay = 0, tremolo = 0, filter = 0
)
{
    // init parameters
    let PI2 = PI*2, sampleRate = zzfxR,
        startSlide = slide *= 500 * PI2 / sampleRate / sampleRate,
        startFrequency = frequency *= 
            rand(1 + randomness, 1-randomness) * PI2 / sampleRate,
        b = [], t = 0, tm = 0, i = 0, j = 1, r = 0, c = 0, s = 0, f, length,

        // biquad LP/HP filter
        quality = 2, w = PI2 * abs(filter) * 2 / sampleRate,
        cos = Math.cos(w), alpha = Math.sin(w) / 2 / quality,
        a0 = 1 + alpha, a1 = -2*cos / a0, a2 = (1 - alpha) / a0,
        b0 = (1 + sign(filter) * cos) / 2 / a0, 
        b1 = -(sign(filter) + cos) / a0, b2 = b0,
        x2 = 0, x1 = 0, y2 = 0, y1 = 0;

    // scale by sample rate
    attack = attack * sampleRate + 9; // minimum attack to prevent pop
    decay *= sampleRate;
    sustain *= sampleRate;
    release *= sampleRate;
    delay *= sampleRate;
    deltaSlide *= 500 * PI2 / sampleRate**3;
    modulation *= PI2 / sampleRate;
    pitchJump *= PI2 / sampleRate;
    pitchJumpTime *= sampleRate;
    repeatTime = repeatTime * sampleRate | 0;
    volume *= soundVolume;

    // generate waveform
    for(length = attack + decay + sustain + release + delay | 0;
        i < length; b[i++] = s * volume)               // sample
    {
        if (!(++c%(bitCrush*100|0)))                   // bit crush
        {
            s = shape? shape>1? shape>2? shape>3?      // wave shape
                Math.sin(t**3) :                       // 4 noise
                clamp(Math.tan(t),1,-1):               // 3 tan
                1-(2*t/PI2%2+2)%2:                     // 2 saw
                1-4*abs(Math.round(t/PI2)-t/PI2):      // 1 triangle
                Math.sin(t);                           // 0 sin

            s = (repeatTime ?
                    1 - tremolo + tremolo*Math.sin(PI2*i/repeatTime) // tremolo
                    : 1) *
                sign(s)*(abs(s)**shapeCurve) *           // curve
                (i < attack ? i/attack :                 // attack
                i < attack + decay ?                     // decay
                1-((i-attack)/decay)*(1-sustainVolume) : // decay falloff
                i < attack  + decay + sustain ?          // sustain
                sustainVolume :                          // sustain volume
                i < length - delay ?                     // release
                (length - i - delay)/release *           // release falloff
                sustainVolume :                          // release volume
                0);                                      // post release

            s = delay ? s/2 + (delay > i ? 0 :           // delay
                (i<length-delay? 1 : (length-i)/delay) * // release delay 
                b[i-delay|0]/2/volume) : s;              // sample delay

            if (filter)                                   // apply filter
                s = y1 = b2*x2 + b1*(x2=x1) + b0*(x1=s) - a2*y2 - a1*(y2=y1);
        }

        f = (frequency += slide += deltaSlide) *// frequency
            Math.cos(modulation*tm++);          // modulation
        t += f + f*noise*Math.sin(i**5);        // noise

        if (j && ++j > pitchJumpTime)           // pitch jump
        { 
            frequency += pitchJump;             // apply pitch jump
            startFrequency += pitchJump;        // also apply to start
            j = 0;                              // stop pitch jump time
        } 

        if (repeatTime && !(++r % repeatTime))  // repeat
        { 
            frequency = startFrequency;         // reset frequency
            slide = startSlide;                 // reset slide
            j = j || 1;                         // reset pitch jump time
        }
    }

    return b;
}

///////////////////////////////////////////////////////////////////////////////
// ZzFX Music Renderer v2.0.3 by Keith Clark and Frank Force

/** Generate samples for a ZzFM song with given parameters
 *  @param {Array} instruments - Array of ZzFX sound paramaters
 *  @param {Array} patterns - Array of pattern data
 *  @param {Array} sequence - Array of pattern indexes
 *  @param {Number} [BPM] - Playback speed of the song in BPM
 *  @return {Array} - Left and right channel sample data
 *  @memberof Audio */
function zzfxM(instruments, patterns, sequence, BPM = 125) 
{
  let i, j, k;
  let instrumentParameters;
  let note;
  let sample;
  let patternChannel;
  let notFirstBeat;
  let stop;
  let instrument;
  let attenuation;
  let outSampleOffset;
  let isSequenceEnd;
  let sampleOffset = 0;
  let nextSampleOffset;
  let sampleBuffer = [];
  let leftChannelBuffer = [];
  let rightChannelBuffer = [];
  let channelIndex = 0;
  let panning = 0;
  let hasMore = 1;
  let sampleCache = {};
  let beatLength = zzfxR / BPM * 60 >> 2;

  // for each channel in order until there are no more
  for (; hasMore; channelIndex++) {

    // reset current values
    sampleBuffer = [hasMore = notFirstBeat = outSampleOffset = 0];

    // for each pattern in sequence
    sequence.forEach((patternIndex, sequenceIndex) => {
      // get pattern for current channel, use empty 1 note pattern if none found
      patternChannel = patterns[patternIndex][channelIndex] || [0, 0, 0];

      // check if there are more channels
      hasMore |= patterns[patternIndex][channelIndex]&&1;

      // get next offset, use the length of first channel
      nextSampleOffset = outSampleOffset + (patterns[patternIndex][0].length - 2 - (notFirstBeat?0:1)) * beatLength;
      // for each beat in pattern, plus one extra if end of sequence
      isSequenceEnd = sequenceIndex == sequence.length - 1;
      for (i = 2, k = outSampleOffset; i < patternChannel.length + isSequenceEnd; notFirstBeat = ++i) {

        // <channel-note>
        note = patternChannel[i];

        // stop if end, different instrument or new note
        stop = i == patternChannel.length + isSequenceEnd - 1 && isSequenceEnd ||
            instrument != (patternChannel[0] || 0) || note | 0;

        // fill buffer with samples for previous beat, most cpu intensive part
        for (j = 0; j < beatLength && notFirstBeat;

            // fade off attenuation at end of beat if stopping note, prevents clicking
            j++ > beatLength - 99 && stop && attenuation < 1? attenuation += 1 / 99 : 0
        ) {
          // copy sample to stereo buffers with panning
          sample = (1 - attenuation) * sampleBuffer[sampleOffset++] / 2 || 0;
          leftChannelBuffer[k] = (leftChannelBuffer[k] || 0) - sample * panning + sample;
          rightChannelBuffer[k] = (rightChannelBuffer[k++] || 0) + sample * panning + sample;
        }

        // set up for next note
        if (note) {
          // set attenuation
          attenuation = note % 1;
          panning = patternChannel[1] || 0;
          if (note |= 0) {
            // get cached sample
            sampleBuffer = sampleCache[
              [
                instrument = patternChannel[sampleOffset = 0] || 0,
                note
              ]
            ] = sampleCache[[instrument, note]] || (
                // add sample to cache
                instrumentParameters = [...instruments[instrument]],
                instrumentParameters[2] *= 2 ** ((note - 12) / 12),

                // allow negative values to stop notes
                note > 0 ? zzfxG(...instrumentParameters) : []
            );
          }
        }
      }

      // update the sample offset
      outSampleOffset = nextSampleOffset;
    });
  }

  return [leftChannelBuffer, rightChannelBuffer];
}


///////////////////////////////////////////////////////////////////////////////
// Tile Layer Rendering System

/**
 * Tile layer data object stores info about how to render a tile
 * @example
 * // create tile layer data with tile index 0 and random orientation and color
 * const tileIndex = 0;
 * const direction = randInt(4)
 * const mirror = randInt(2);
 * const color = randColor();
 * const data = new TileLayerData(tileIndex, direction, mirror, color);
 */
class TileLayerData
{
    /** Create a tile layer data object, one for each tile in a TileLayer
     *  @param {Number}  [tile]      - The tile to use, untextured if undefined
     *  @param {Number}  [direction] - Integer direction of tile, in 90 degree increments
     *  @param {Boolean} [mirror]    - If the tile should be mirrored along the x axis
     *  @param {Color}   [color]     - Color of the tile */
    constructor(tile, direction=0, mirror=false, color=new Color)
    {
        /** @property {Number}  - The tile to use, untextured if undefined */
        this.tile      = tile;
        /** @property {Number}  - Integer direction of tile, in 90 degree increments */
        this.direction = direction;
        /** @property {Boolean} - If the tile should be mirrored along the x axis */
        this.mirror    = mirror;
        /** @property {Color}   - Color of the tile */
        this.color     = color;
    }

    /** Set this tile to clear, it will not be rendered */
    clear() { this.tile = this.direction = 0; this.mirror = false; this.color = new Color; }
}

/**
 * Tile Layer - cached rendering system for tile layers
 * - Each Tile layer is rendered to an off screen canvas
 * - To allow dynamic modifications, layers are rendered using canvas 2d
 * - Some devices like mobile phones are limited to 4k texture resolution
 * - So with 16x16 tiles this limits layers to 256x256 on mobile devices
 * @extends EngineObject
 * @example
 * // create tile collision and visible tile layer
 * initTileCollision(vec2(200,100));
 * const tileLayer = new TileLayer();
 */
class TileLayer extends EngineObject
{
    /** Create a tile layer object
    *  @param {Vector2}  [position=(0,0)]     - World space position
    *  @param {Vector2}  [size=tileCollisionSize] - World space size
    *  @param {TileInfo} [tileInfo]    - Tile info for layer
    *  @param {Vector2}  [scale=(1,1)] - How much to scale this layer when rendered
    *  @param {Number}   [renderOrder] - Objects are sorted by renderOrder
    */
    constructor(position, size=vec2(), tileInfo=tile(), scale=vec2(1), renderOrder=0)
    {
        super(position, size, tileInfo, 0, undefined, renderOrder);

        /** @property {HTMLCanvasElement} - The canvas used by this tile layer */
        this.canvas = document.createElement('canvas');
        /** @property {CanvasRenderingContext2D} - The 2D canvas context used by this tile layer */
        this.context = this.canvas.getContext('2d');
        /** @property {Vector2} - How much to scale this layer when rendered */
        this.scale = scale;
        /** @property {Boolean} - If true this layer will render to overlay canvas and appear above all objects */
        this.isOverlay = false;

        // init tile data
        this.data = [];
        for (let j = this.size.area(); j--;)
            this.data.push(new TileLayerData);
    }
    
    /** Set data at a given position in the array 
     *  @param {Vector2}       layerPos - Local position in array
     *  @param {TileLayerData} data     - Data to set
     *  @param {Boolean}       [redraw] - Force the tile to redraw if true */
    setData(layerPos, data, redraw=false)
    {
        if (layerPos.arrayCheck(this.size))
        {
            this.data[(layerPos.y|0)*this.size.x+layerPos.x|0] = data;
            redraw && this.drawTileData(layerPos);
        }
    }
    
    /** Get data at a given position in the array 
     *  @param {Vector2} layerPos - Local position in array
     *  @return {TileLayerData} */
    getData(layerPos)
    { return layerPos.arrayCheck(this.size) && this.data[(layerPos.y|0)*this.size.x+layerPos.x|0]; }
    
    // Tile layers are not updated
    update() {}

    // Render the tile layer, called automatically by the engine
    render()
    {
        // flush and copy gl canvas because tile canvas does not use webgl
        !glOverlay && !this.isOverlay && glCopyToContext(mainContext);
        
        // draw the entire cached level onto the canvas
        const pos = worldToScreen(this.pos.add(vec2(0,this.size.y*this.scale.y)));
        (this.isOverlay ? overlayContext : mainContext).drawImage
        (
            this.canvas, pos.x, pos.y,
            cameraScale*this.size.x*this.scale.x, cameraScale*this.size.y*this.scale.y
        );
    }

    /** Draw all the tile data to an offscreen canvas 
     *  - This may be slow in some browsers but only needs to be done once */
    redraw()
    {
        this.redrawStart(true);
        for (let x = this.size.x; x--;)
        for (let y = this.size.y; y--;)
            this.drawTileData(vec2(x,y), false);
        this.redrawEnd();
    }

    /** Call to start the redraw process
     *  - This can be used to manually update small parts of the level
     *  @param {Boolean} [clear] - Should it clear the canvas before drawing */
    redrawStart(clear=false)
    {
        // save current render settings
        /** @type {[HTMLCanvasElement, CanvasRenderingContext2D, Vector2, Vector2, number]} */
        this.savedRenderSettings = [mainCanvas, mainContext, mainCanvasSize, cameraPos, cameraScale];

        // use webgl rendering system to render the tiles if enabled
        // this works by temporally taking control of the rendering system
        mainCanvas = this.canvas;
        mainContext = this.context;
        mainCanvasSize = this.size.multiply(this.tileInfo.size);
        cameraPos = this.size.scale(.5);
        cameraScale = this.tileInfo.size.x;

        if (clear)
        {
            // clear and set size
            mainCanvas.width  = mainCanvasSize.x;
            mainCanvas.height = mainCanvasSize.y;
        }

        // disable smoothing for pixel art
        this.context.imageSmoothingEnabled = !canvasPixelated;

        // setup gl rendering if enabled
        glPreRender();
    }

    /** Call to end the redraw process */
    redrawEnd()
    {
        glCopyToContext(mainContext, true);

        // set stuff back to normal
        [mainCanvas, mainContext, mainCanvasSize, cameraPos, cameraScale] = this.savedRenderSettings;
    }

    /** Draw the tile at a given position in the tile grid
     *  This can be used to clear out tiles when they are destroyed
     *  Tiles can also be redrawn if isinde a redrawStart/End block
     *  @param {Vector2} layerPos 
     *  @param {Boolean} [clear] - should the old tile be cleared out
     */
    drawTileData(layerPos, clear=true)
    {
        // clear out where the tile was, for full opaque tiles this can be skipped
        const s = this.tileInfo.size;
        if (clear)
        {
            const pos = layerPos.multiply(s);
            this.context.clearRect(pos.x, this.canvas.height-pos.y, s.x, -s.y);
        }

        // draw the tile if not undefined
        const d = this.getData(layerPos);
        if (d.tile != undefined)
        {
            const pos = this.pos.add(layerPos).add(vec2(.5));
            const tileInfo = tile(d.tile, s, this.tileInfo.textureIndex);
            drawTile(pos, vec2(1), tileInfo, d.color, d.direction*PI/2, d.mirror);
        }
    }

    /** Draw directly to the 2D canvas in world space (bipass webgl)
     *  @param {Vector2}  pos
     *  @param {Vector2}  size
     *  @param {Number}   angle
     *  @param {Boolean}  mirror
     *  @param {Function} drawFunction */
    drawCanvas2D(pos, size, angle, mirror, drawFunction)
    {
        const context = this.context;
        context.save();
        pos = pos.subtract(this.pos).multiply(this.tileInfo.size);
        size = size.multiply(this.tileInfo.size);
        context.translate(pos.x, this.canvas.height - pos.y);
        context.rotate(angle);
        context.scale(mirror ? -size.x : size.x, size.y);
        drawFunction(context);
        context.restore();
    }

    /** Draw a tile directly onto the layer canvas in world space
     *  @param {Vector2}  pos
     *  @param {Vector2}  [size=(1,1)]
     *  @param {TileInfo} [tileInfo]
     *  @param {Color}    [color=(1,1,1,1)]
     *  @param {Number}   [angle=0]
     *  @param {Boolean}  [mirror=0] */
    drawTile(pos, size=vec2(1), tileInfo, color=new Color, angle, mirror)
    {
        this.drawCanvas2D(pos, size, angle, mirror, (context)=>
        {
            const textureInfo = tileInfo && tileInfo.getTextureInfo();
            if (textureInfo)
            {
                context.globalAlpha = color.a; // only alpha is supported
                context.drawImage(textureInfo.image, 
                    tileInfo.pos.x,  tileInfo.pos.y, 
                    tileInfo.size.x, tileInfo.size.y, -.5, -.5, 1, 1);
                context.globalAlpha = 1;
            }
            else
            {
                // untextured
                context.fillStyle = color;
                context.fillRect(-.5, -.5, 1, 1);
            }
        });
    }

    /** Draw a rectangle directly onto the layer canvas in world space
     *  @param {Vector2} pos
     *  @param {Vector2} [size=(1,1)]
     *  @param {Color}   [color=(1,1,1,1)]
     *  @param {Number}  [angle=0] */
    drawRect(pos, size, color, angle) 
    { this.drawTile(pos, size, undefined, color, angle); }
}

/**
 * LittleJS WebGL Interface
 * - All webgl used by the engine is wrapped up here
 * - For normal stuff you won't need to see or call anything in this file
 * - For advanced stuff there are helper functions to create shaders, textures, etc
 * - Can be disabled with glEnable to revert to 2D canvas rendering
 * - Batches sprite rendering on GPU for incredibly fast performance
 * - Sprite transform math is done in the shader where possible
 * - Supports shadertoy style post processing shaders
 * @namespace WebGL
 */



/** The WebGL canvas which appears above the main canvas and below the overlay canvas
 *  @type {HTMLCanvasElement}
 *  @memberof WebGL */
let glCanvas;

/** 2d context for glCanvas
 *  @type {WebGL2RenderingContext}
 *  @memberof WebGL */
let glContext;

// WebGL internal variables not exposed to documentation
let glShader, glActiveTexture, glArrayBuffer, glGeometryBuffer, glPositionData, glColorData, glInstanceCount, glAdditive, glBatchAdditive;

///////////////////////////////////////////////////////////////////////////////

// Initalize WebGL, called automatically by the engine
function glInit()
{
    // create the canvas and textures
    glCanvas = document.createElement('canvas');
    glContext = glCanvas.getContext('webgl2');

    // some browsers are much faster without copying the gl buffer so we just overlay it instead
    glOverlay && document.body.appendChild(glCanvas);

    // setup vertex and fragment shaders
    glShader = glCreateProgram(
        '#version 300 es\n' +     // specify GLSL ES version
        'precision highp float;'+ // use highp for better accuracy
        'uniform mat4 m;'+        // transform matrix
        'in vec2 g;'+             // geometry
        'in vec4 p,u,c,a;'+       // position/size, uvs, color, additiveColor
        'in float r;'+            // rotation
        'out vec2 v;'+            // return uv, color, additiveColor
        'out vec4 d,e;'+          // return uv, color, additiveColor
        'void main(){'+           // shader entry point
        'vec2 s=(g-.5)*p.zw;'+    // get size offset
        'gl_Position=m*vec4(p.xy+s*cos(r)-vec2(-s.y,s)*sin(r),1,1);'+ // transform position
        'v=mix(u.xw,u.zy,g);'+    // pass uv to fragment shader
        'd=c;e=a;'+               // pass colors to fragment shader
        '}'                       // end of shader
        ,
        '#version 300 es\n' +     // specify GLSL ES version
        'precision highp float;'+ // use highp for better accuracy
        'in vec2 v;'+             // uv
        'in vec4 d,e;'+           // color, additiveColor
        'uniform sampler2D s;'+   // texture
        'out vec4 c;'+            // out color
        'void main(){'+           // shader entry point
        'c=texture(s,v)*d+e;'+    // modulate texture by color plus additive
        '}'                       // end of shader
    );

    // init buffers
    const glInstanceData = new ArrayBuffer(gl_INSTANCE_BUFFER_SIZE);
    glPositionData = new Float32Array(glInstanceData);
    glColorData = new Uint32Array(glInstanceData);
    glArrayBuffer = glContext.createBuffer();
    glGeometryBuffer = glContext.createBuffer();

    // create the geometry buffer, triangle strip square
    const geometry = new Float32Array([glInstanceCount=0,0,1,0,0,1,1,1]);
    glContext.bindBuffer(gl_ARRAY_BUFFER, glGeometryBuffer);
    glContext.bufferData(gl_ARRAY_BUFFER, geometry, gl_STATIC_DRAW);
}

// Setup render each frame, called automatically by engine
function glPreRender()
{
    // clear and set to same size as main canvas
    glContext.viewport(0, 0, glCanvas.width=mainCanvas.width, glCanvas.height=mainCanvas.height);
    glContext.clear(gl_COLOR_BUFFER_BIT);

    // set up the shader
    glContext.useProgram(glShader);
    glContext.activeTexture(gl_TEXTURE0);
    glContext.bindTexture(gl_TEXTURE_2D, glActiveTexture = textureInfos[0].glTexture);

    // set vertex attributes
    let offset = glAdditive = glBatchAdditive = 0;
    let initVertexAttribArray = (name, type, typeSize, size)=>
    {
        const location = glContext.getAttribLocation(glShader, name);
        const stride = typeSize && gl_INSTANCE_BYTE_STRIDE; // only if not geometry
        const divisor = typeSize && 1; // only if not geometry
        const normalize = typeSize==1; // only if color
        glContext.enableVertexAttribArray(location);
        glContext.vertexAttribPointer(location, size, type, normalize, stride, offset);
        glContext.vertexAttribDivisor(location, divisor);
        offset += size*typeSize;
    }
    glContext.bindBuffer(gl_ARRAY_BUFFER, glGeometryBuffer);
    initVertexAttribArray('g', gl_FLOAT, 0, 2); // geometry
    glContext.bindBuffer(gl_ARRAY_BUFFER, glArrayBuffer);
    glContext.bufferData(gl_ARRAY_BUFFER, gl_INSTANCE_BUFFER_SIZE, gl_DYNAMIC_DRAW);
    initVertexAttribArray('p', gl_FLOAT, 4, 4); // position & size
    initVertexAttribArray('u', gl_FLOAT, 4, 4); // texture coords
    initVertexAttribArray('c', gl_UNSIGNED_BYTE, 1, 4); // color
    initVertexAttribArray('a', gl_UNSIGNED_BYTE, 1, 4); // additiveColor
    initVertexAttribArray('r', gl_FLOAT, 4, 1); // rotation

    // build the transform matrix
    const s = vec2(2*cameraScale).divide(mainCanvasSize);
    const p = vec2(-1).subtract(cameraPos.multiply(s));
    glContext.uniformMatrix4fv(glContext.getUniformLocation(glShader, 'm'), false,
        new Float32Array([
            s.x, 0,   0,   0,
            0,   s.y, 0,   0,
            1,   1,   1,   1,
            p.x, p.y, 0,   0
        ])
    );
}

/** Set the WebGl texture, called automatically if using multiple textures
 *  - This may also flush the gl buffer resulting in more draw calls and worse performance
 *  @param {WebGLTexture} texture
 *  @memberof WebGL */
function glSetTexture(texture)
{
    // must flush cache with the old texture to set a new one
    if (texture == glActiveTexture)
        return;

    glFlush();
    glContext.bindTexture(gl_TEXTURE_2D, glActiveTexture = texture);
}

/** Compile WebGL shader of the given type, will throw errors if in debug mode
 *  @param {String} source
 *  @param {Number} type
 *  @return {WebGLShader}
 *  @memberof WebGL */
function glCompileShader(source, type)
{
    // build the shader
    const shader = glContext.createShader(type);
    glContext.shaderSource(shader, source);
    glContext.compileShader(shader);

    return shader;
}

/** Create WebGL program with given shaders
 *  @param {String} vsSource
 *  @param {String} fsSource
 *  @return {WebGLProgram}
 *  @memberof WebGL */
function glCreateProgram(vsSource, fsSource)
{
    // build the program
    const program = glContext.createProgram();
    glContext.attachShader(program, glCompileShader(vsSource, gl_VERTEX_SHADER));
    glContext.attachShader(program, glCompileShader(fsSource, gl_FRAGMENT_SHADER));
    glContext.linkProgram(program);

     return program;
}

/** Create WebGL texture from an image and init the texture settings
 *  @param {HTMLImageElement} image
 *  @return {WebGLTexture}
 *  @memberof WebGL */
function glCreateTexture(image)
{
    // build the texture
    const texture = glContext.createTexture();
    glContext.bindTexture(gl_TEXTURE_2D, texture);
    if (image)
        glContext.texImage2D(gl_TEXTURE_2D, 0, gl_RGBA, gl_RGBA, gl_UNSIGNED_BYTE, image);

    // use point filtering for pixelated rendering
    const filter = canvasPixelated ? gl_NEAREST : gl_LINEAR;
    glContext.texParameteri(gl_TEXTURE_2D, gl_TEXTURE_MIN_FILTER, filter);
    glContext.texParameteri(gl_TEXTURE_2D, gl_TEXTURE_MAG_FILTER, filter);

    return texture;
}

/** Draw all sprites and clear out the buffer, called automatically by the system whenever necessary
 *  @memberof WebGL */
function glFlush()
{
    if (!glInstanceCount) return;

    const destBlend = glBatchAdditive ? gl_ONE : gl_ONE_MINUS_SRC_ALPHA;
    glContext.blendFuncSeparate(gl_SRC_ALPHA, destBlend, gl_ONE, destBlend);
    glContext.enable(gl_BLEND);

    // draw all the sprites in the batch and reset the buffer
    glContext.bufferSubData(gl_ARRAY_BUFFER, 0, glPositionData);
    glContext.drawArraysInstanced(gl_TRIANGLE_STRIP, 0, 4, glInstanceCount);
    glInstanceCount = 0;
    glBatchAdditive = glAdditive;
}

/** Draw any sprites still in the buffer, copy to main canvas and clear
 *  @param {CanvasRenderingContext2D} context
 *  @param {Boolean} [forceDraw]
 *  @memberof WebGL */
function glCopyToContext(context, forceDraw=false)
{
    if (!glInstanceCount && !forceDraw) return;

    glFlush();

    // do not draw in overlay mode because the canvas is visible
    if (!glOverlay || forceDraw)
        context.drawImage(glCanvas, 0, 0);
}

/** Add a sprite to the gl draw list, used by all gl draw functions
 *  @param {Number} x
 *  @param {Number} y
 *  @param {Number} sizeX
 *  @param {Number} sizeY
 *  @param {Number} angle
 *  @param {Number} uv0X
 *  @param {Number} uv0Y
 *  @param {Number} uv1X
 *  @param {Number} uv1Y
 *  @param {Number} rgba
 *  @param {Number} [rgbaAdditive=0]
 *  @memberof WebGL */
function glDraw(x, y, sizeX, sizeY, angle, uv0X, uv0Y, uv1X, uv1Y, rgba, rgbaAdditive=0)
{
    // flush if there is not enough room or if different blend mode
    if (glInstanceCount >= gl_MAX_INSTANCES || glBatchAdditive != glAdditive)
        glFlush();

    let offset = glInstanceCount * gl_INDICIES_PER_INSTANCE;
    glPositionData[offset++] = x;
    glPositionData[offset++] = y;
    glPositionData[offset++] = sizeX;
    glPositionData[offset++] = sizeY;
    glPositionData[offset++] = uv0X;
    glPositionData[offset++] = uv0Y;
    glPositionData[offset++] = uv1X;
    glPositionData[offset++] = uv1Y;
    glColorData[offset++] = rgba;
    glColorData[offset++] = rgbaAdditive;
    glPositionData[offset++] = angle;
    glInstanceCount++;
}

///////////////////////////////////////////////////////////////////////////////
// store gl constants as integers so their name doesn't use space in minifed
const
gl_ONE = 1,
gl_TRIANGLE_STRIP = 5,
gl_SRC_ALPHA = 770,
gl_ONE_MINUS_SRC_ALPHA = 771,
gl_BLEND = 3042,
gl_TEXTURE_2D = 3553,
gl_UNSIGNED_BYTE = 5121,
gl_FLOAT = 5126,
gl_RGBA = 6408,
gl_NEAREST = 9728,
gl_LINEAR = 9729,
gl_TEXTURE_MAG_FILTER = 10240,
gl_TEXTURE_MIN_FILTER = 10241,
gl_COLOR_BUFFER_BIT = 16384,
gl_TEXTURE0 = 33984,
gl_ARRAY_BUFFER = 34962,
gl_STATIC_DRAW = 35044,
gl_DYNAMIC_DRAW = 35048,
gl_FRAGMENT_SHADER = 35632,
gl_VERTEX_SHADER = 35633,
gl_COMPILE_STATUS = 35713,
gl_LINK_STATUS = 35714,
gl_UNPACK_FLIP_Y_WEBGL = 37440,

// constants for batch rendering
gl_INDICIES_PER_INSTANCE = 11,
gl_MAX_INSTANCES = 1e4,
gl_INSTANCE_BYTE_STRIDE = gl_INDICIES_PER_INSTANCE * 4, // 11 * 4
gl_INSTANCE_BUFFER_SIZE = gl_MAX_INSTANCES * gl_INSTANCE_BYTE_STRIDE;
/** 
 * LittleJS - The Tiny Fast JavaScript Game Engine
 * MIT License - Copyright 2021 Frank Force
 * 
 * Engine Features
 * - Object oriented system with base class engine object
 * - Base class object handles update, physics, collision, rendering, etc
 * - Engine helper classes and functions like Vector2, Color, and Timer
 * - Super fast rendering system for tile sheets
 * - Sound effects audio with zzfx and music with zzfxm
 * - Input processing system with gamepad and touchscreen support
 * - Tile layer rendering and collision system
 * - Particle effect system
 * - Medal system tracks and displays achievements
 * - Debug tools and debug rendering system
 * - Post processing effects
 * - Call engineInit() to start it up!
 * @namespace Engine
 */




/** Frames per second to update
 *  @type {Number}
 *  @default
 *  @memberof Engine */
const frameRate = 60;

/** How many seconds each frame lasts, engine uses a fixed time step
 *  @type {Number}
 *  @default 1/60
 *  @memberof Engine */
const timeDelta = 1/frameRate;

/** Array containing all engine objects
 *  @type {Array}
 *  @memberof Engine */
let engineObjects = [];

/** Current update frame, used to calculate time
 *  @type {Number}
 *  @memberof Engine */
let frame = 0;

/** Current engine time since start in seconds
 *  @type {Number}
 *  @memberof Engine */
let time = 0;

/** Actual clock time since start in seconds (not affected by pause or frame rate clamping)
 *  @type {Number}
 *  @memberof Engine */
let timeReal = 0;

/** Is the game paused? Causes time and objects to not be updated
 *  @type {Boolean}
 *  @default false
 *  @memberof Engine */
let paused = false;

/** Set if game is paused
 *  @param {Boolean} isPaused
 *  @memberof Engine */
function setPaused(isPaused) { paused = isPaused; }

// Frame time tracking
let frameTimeLastMS = 0, frameTimeBufferMS = 0, averageFPS = 0;

///////////////////////////////////////////////////////////////////////////////

/** Startup LittleJS engine with your callback functions
 *  @param {Function} gameInit       - Called once after the engine starts up, setup the game
 *  @param {Function} gameUpdate     - Called every frame at 60 frames per second, handle input and update the game state
 *  @param {Function} gameUpdatePost - Called after physics and objects are updated, setup camera and prepare for render
 *  @param {Function} gameRender     - Called before objects are rendered, draw any background effects that appear behind objects
 *  @param {Function} gameRenderPost - Called after objects are rendered, draw effects or hud that appear above all objects
 *  @param {Array} [imageSources=['tiles.png']] - Image to load
 *  @memberof Engine */
function engineInit(gameInit, gameUpdate, gameRenderPost)
{
    // Called automatically by engine to setup render system
    function enginePreRender()
    {
        // save canvas size
        mainCanvasSize = vec2(mainCanvas.width, mainCanvas.height);

        // disable smoothing for pixel art
        mainContext.imageSmoothingEnabled = !canvasPixelated;

        // setup gl rendering if enabled
        glPreRender();
    }

    // internal update loop for engine
    function engineUpdate(frameTimeMS=0)
    {
        // update time keeping
        let frameTimeDeltaMS = frameTimeMS - frameTimeLastMS;
        frameTimeLastMS = frameTimeMS;
        timeReal += frameTimeDeltaMS / 1e3;
        frameTimeBufferMS += paused ? 0 : frameTimeDeltaMS;
        frameTimeBufferMS = min(frameTimeBufferMS, 50); // clamp in case of slow framerate
        updateCanvas();

        if (paused)
        {
            // do post update even when paused
            inputUpdate();
            //gameUpdatePost();
            inputUpdatePost();
        }
        else
        {
            // apply time delta smoothing, improves smoothness of framerate in some browsers
            let deltaSmooth = 0;
            if (frameTimeBufferMS < 0 && frameTimeBufferMS > -9)
            {
                // force an update each frame if time is close enough (not just a fast refresh rate)
                deltaSmooth = frameTimeBufferMS;
                frameTimeBufferMS = 0;
            }
            
            // update multiple frames if necessary in case of slow framerate
            for (;frameTimeBufferMS >= 0; frameTimeBufferMS -= 1e3 / frameRate)
            {
                // increment frame and update time
                time = frame++ / frameRate;

                // update game and objects
                inputUpdate();
                gameUpdate();
                engineObjectsUpdate();

                // do post update
                //gameUpdatePost();
                inputUpdatePost();
            }

            // add the time smoothing back in
            frameTimeBufferMS += deltaSmooth;
        }
        
        // render sort then render while removing destroyed objects
        enginePreRender();
        //gameRender();
        engineObjects.sort((a,b)=> a.renderOrder - b.renderOrder);
        for (const o of engineObjects)
            o.destroyed || o.render();
        gameRenderPost();
        //glRenderPostProcess();
        glCopyToContext(mainContext);

        requestAnimationFrame(engineUpdate);
    }

    function updateCanvas()
    {
        if (canvasFixedSize.x)
        {
            // clear canvas and set fixed size
            mainCanvas.width  = canvasFixedSize.x;
            mainCanvas.height = canvasFixedSize.y;
            
            // fit to window by adding space on top or bottom if necessary
            const aspect = innerWidth / innerHeight;
            const fixedAspect = mainCanvas.width / mainCanvas.height;
            (glCanvas||mainCanvas).style.width = mainCanvas.style.width = overlayCanvas.style.width  = aspect < fixedAspect ? '100%' : '';
            (glCanvas||mainCanvas).style.height = mainCanvas.style.height = overlayCanvas.style.height = aspect < fixedAspect ? '' : '100%';
        }
        else
        {
            // clear canvas and set size to same as window
            mainCanvas.width  = min(innerWidth,  canvasMaxSize.x);
            mainCanvas.height = min(innerHeight, canvasMaxSize.y);
        }
        
        // clear overlay canvas and set size
        overlayCanvas.width  = mainCanvas.width;
        overlayCanvas.height = mainCanvas.height;

        // save canvas size
        mainCanvasSize = vec2(mainCanvas.width, mainCanvas.height);
    }

    // setup html
     const styleBody = 
        'margin:0;overflow:hidden;' + // fill the window
        'background:#5b6ee1;' +          // set background color
        'touch-action:none;' +        // prevent mobile pinch to resize
        'user-select:none;' +         // prevent mobile hold to select
        '-webkit-user-select:none;' + // compatibility for ios
        '-webkit-touch-callout:none'; // compatibility for ios
    document.body.style.cssText = styleBody;
    document.body.appendChild(mainCanvas = document.createElement('canvas'));
    mainContext = mainCanvas.getContext('2d');

    // init stuff and start engine
    glInit();

    // create overlay canvas for hud to appear above gl canvas
    document.body.appendChild(overlayCanvas = document.createElement('canvas'));
    overlayContext = overlayCanvas.getContext('2d');

    // set canvas style
    const styleCanvas = 'position:absolute;' +             // position
        'top:50%;left:50%;transform:translate(-50%,-50%)'; // center
    (glCanvas||mainCanvas).style.cssText = mainCanvas.style.cssText = overlayCanvas.style.cssText = styleCanvas;
    updateCanvas();
    
    // create promises for loading images
    const image = new Image;
    image.onerror = image.onload = () => {
        textureInfos[0] = new TextureInfo(image);
        // start the engine
        gameInit();
        engineUpdate();
    }
    image.src = 't.png';
}

/** Update each engine object, remove destroyed objects, and update time
 *  @memberof Engine */
function engineObjectsUpdate()
{

    // recursive object update
    function updateObject(o)
    {
        if (!o.destroyed)
        {
            o.update();
        }
    }
    for (const o of engineObjects)
        updateObject(o);

    // remove destroyed objects
    engineObjects = engineObjects.filter(o=>!o.destroyed);
}
