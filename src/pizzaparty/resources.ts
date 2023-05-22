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
        pizza: new GLTFShape("models/pizza3.glb"),
        floor: new GLTFShape("models/pizzafloor.glb"),
        pep: new GLTFShape("models/pepp2.glb")
    },


    objects:[
        {transform:{position:new Vector3(8,1,8), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(3,3,3)}, model:"pizza", type:"decor", components:[{t:"rotating", a:"z", v:-45}]},
        {transform:{position:new Vector3(4,1,15), rotation:Quaternion.Euler(0,0,0), scale:new Vector3(1,1,1)}, model:"pizza", type:"decor", components:[{t:"rotating",a:"y", v:100}]},
        {transform:{position:new Vector3(3,1,2), rotation:Quaternion.Euler(0,0,0), scale:new Vector3(1,1,1)}, model:"pizza", type:"decor", components:[{t:"rotating",a:"y", v:-90}]},
        {transform:{position:new Vector3(18,6,-4.5), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[]},
        {transform:{position:new Vector3(9,3,12), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[{}]},
        {transform:{position:new Vector3(15,4,12), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(14,5,6), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(3,3,3)}, model:"pizza", type:"decor", components:[{t:"rotating", a:"z", v:-45}]},
        {transform:{position:new Vector3(15,4,12), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(19,5,-10), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(3,3,3)}, model:"pizza", type:"decor", components:[{t:"rotating", a:"z", v:-45}]},
        {transform:{position:new Vector3(20,5,-17), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(3,3,3)}, model:"pizza", type:"decor", components:[{t:"rotating", a:"z", v:45}]},
        {transform:{position:new Vector3(20,6.2,-25), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(23,8,-27), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(26,10,-22), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(27,11.4,-19), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[{t:"rotating", a:"z", v:45}]},
        {transform:{position:new Vector3(27,12,-14), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[{t:"rotating", a:"z", v:-45}]},
        {transform:{position:new Vector3(25,13,-9), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(3,3,3)}, model:"pizza", type:"decor", components:[{t:"rotating", a:"z", v:-45}]},
        {transform:{position:new Vector3(19,14,-5), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(3,3,3)}, model:"pizza", type:"decor", components:[{t:"rotating", a:"z", v:45}]},
        {transform:{position:new Vector3(20,15.1,2.4), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(24,16,7), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(21,17.2,11), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(27,19,10), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[{t:"rotating", a:"z", v:45}]},
        {transform:{position:new Vector3(28,20,5), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[{t:"rotating", a:"z", v:-45}]},
        {transform:{position:new Vector3(36,18,-3), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[{t:"rotating", a:"z", v:45}]},
        {transform:{position:new Vector3(37,19,-9), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(3,3,3)}, model:"pizza", type:"decor", components:[{t:"rotating", a:"z", v:-45}]},
        {transform:{position:new Vector3(40,20.1,-12), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(3,3,3)}, model:"pizza", type:"decor", components:[{t:"rotating", a:"z", v:45}]},
        {transform:{position:new Vector3(42,20.5,-18.6), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(45,22,-14), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(44,23.75,-11), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(45,25,-7), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[]},
        {transform:{position:new Vector3(48,26.5,-2), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[]},
        {transform:{position:new Vector3(45,28,10), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[{t:"rotating", a:"z", v:45}]},
        {transform:{position:new Vector3(56,28,9), rotation:Quaternion.Euler(270,0,180), scale:new Vector3(6,6,6)}, model:"pizza", type:"platform", components:[{t:"rotating", a:"z", v:-45}]},
        {transform:{position:new Vector3(61,29,3), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(56,30.3,4), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(51,32.5,6), rotation:Quaternion.Euler(180,0,180), scale:new Vector3(6,6,6)}, model:"pep", type:"platform", components:[]},
        {transform:{position:new Vector3(41,34,-11), rotation:Quaternion.Euler(270,210,180), scale:new Vector3(30,21,3)}, model:"pizza", type:"platform", components:[]},
      



    ]
}

