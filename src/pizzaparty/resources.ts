/**
 * add new objects to the 'objects' array
 * objects need:
 * - transform
 * - a model type which matches the name of the models in lines 11
 * - a type of object - decor, platform, moving
 * - components array - it can be blank or take in the following:
 * - t is for "type" - rotating, scaling, etc
 * - a is for "axis" - x, y, z
 * - v is for 'value' - how fast to scale, rotate, move, etc
 * 
 */



export default {

    models:{
        pizza: new GLTFShape("models/pizza.glb"),
        floor: new GLTFShape("models/pizzafloor.glb")
    },


    objects:[
        {transform:{position:new Vector3(8,1,8), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(3,3,3)}, model:"pizza", type:"decor", components:[{t:"rotating", a:"z", v:-45}]},
        {transform:{position:new Vector3(32,3,32), rotation:Quaternion.Euler(0,0,0), scale:new Vector3(1,1,1)}, model:"pizza", type:"decor", components:[{t:"rotating",a:"y", v:45}]},
        {transform:{position:new Vector3(14,14,14), rotation:Quaternion.Euler(0,0,0), scale:new Vector3(1,1,1)}, model:"pizza", type:"decor", components:[{t:"rotating",a:"y", v:-45}]},
        {transform:{position:new Vector3(3,1,2), rotation:Quaternion.Euler(0,0,0), scale:new Vector3(1,1,1)}, model:"pizza", type:"decor", components:[{t:"rotating",a:"y", v:45}]},
        {transform:{position:new Vector3(1,1,19), rotation:Quaternion.Euler(0,0,0), scale:new Vector3(1,1,1)}, model:"pizza", type:"decor", components:[{t:"rotating",a:"y", v:20}]},
        {transform:{position:new Vector3(4,1,15), rotation:Quaternion.Euler(0,0,0), scale:new Vector3(1,1,1)}, model:"pizza", type:"decor", components:[{t:"rotating",a:"y", v:100}]},
        {transform:{position:new Vector3(3,1,2), rotation:Quaternion.Euler(0,0,0), scale:new Vector3(1,1,1)}, model:"pizza", type:"decor", components:[{t:"rotating",a:"y", v:-90}]},
        {transform:{position:new Vector3(16,5,16), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[]},
        {transform:{position:new Vector3(24,15,24), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[]},


    ]
}

