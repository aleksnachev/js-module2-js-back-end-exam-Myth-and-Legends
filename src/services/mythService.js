import Myth from "../models/Myths.js";

export function getAll(){
    return Myth.find()
}

export function getOne(mythId){
    return Myth.findById(mythId).populate(['owner', 'followers'])
}

export function getLatest(){
    return Myth.find().sort({_id: -1}).limit(3)
}
export async function create(mythData, userId){
    return Myth.create({
        ...mythData,
        owner:userId
    })
}

export async function remove(mythId, userId){
    const myth = await Myth.findById(mythId)

    if (!myth.owner.equals(userId)){
        throw new Error ('Cannot delete myth if not owner')
    }

    return Myth.findByIdAndDelete(mythId)
}

export function edit(mythId,mythData){
    return Myth.findByIdAndUpdate(mythId, mythData, {runValidators:true})
}

export async function follow(mythId, userId){
    const myth = await Myth.findById(mythId)
    if (myth.owner.equals(userId)){
        throw new Error ('Owner cannot follow myth')
    }

    myth.followers.push(userId)
    return myth.save()
}