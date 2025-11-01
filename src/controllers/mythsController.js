import {Router} from 'express'
import { isAuth } from '../middlewares/authMiddleware.js'
import { mythService } from '../services/index.js'
import { getErrorMesage } from '../utils/errorUtils.js'

const mythsController = Router()

mythsController.get('/', async(req,res) => {
    const myths = await mythService.getAll()
    res.render('myths', {myths, pageTitle: 'Dashboard'})
})

mythsController.get('/create', isAuth,(req,res) => {
    res.render('myths/create', {pageTitle:'Create Myth'})
})

mythsController.post('/create',isAuth, async(req,res) => {
    const mythData = req.body
    const userId = req.user.id

    try{
        await mythService.create(mythData,userId)
        res.redirect('/myths')
    }catch(err){
        res.render('myths/create',{
            myth: mythData,
            error: getErrorMesage(err)
        })
    }
    
})

mythsController.get('/:mythId/details', async (req,res) => {
    const mythId = req.params.mythId
    const userId = req.user?.id
    const myth = await mythService.getOne(mythId)
    const isOwner = myth.owner.equals(userId)

    const isFollowing = myth.followers.some(follower => follower.equals(userId))
    res.render('myths/details', {myth, isOwner, isFollowing, pageTitle: 'Details Page'} )
})

mythsController.get('/:mythId/delete', isAuth, async (req,res)=> {
    const mythId = req.params.mythId
    const userId = req.user.id

    await mythService.remove(mythId,userId)
    res.redirect('/myths')
})

mythsController.get('/:mythId/edit', isAuth, async (req,res) =>{
    const mythId= req.params.mythId
    const myth = await mythService.getOne(mythId)

    if (!myth.owner.equals(req.user.id)){
        throw {
            statusCode:401,
            message: 'Cannot edit blog that you are not owner'
        }
    }

    res.render('myths/edit', {myth, pageTitle: 'Edit Page'})
})

mythsController.post('/:mythId/edit', isAuth, async (req,res) =>{
    const mythId= req.params.mythId
    const mythData = req.body
    const myth = await mythService.getOne(mythId)

    if (!myth.owner.equals(req.user.id)){
        throw {
            statusCode:401,
            message: 'Cannot edit blog that you are not owner'
        }
    }

    try{
        await mythService.edit(mythId,mythData)
        res.redirect(`/myths/${mythId}/details`)
    }catch(err){
        res.render('myths/edit', {
            myth: mythData,
            error: getErrorMesage(err)
        })
    }
})

mythsController.get('/:mythId/follow', isAuth, async (req,res)=> {
    const mythId = req.params.mythId
    const userId = req.user.id

    await mythService.follow(mythId,userId)
    res.redirect(`/myths/${mythId}/details`)
})

export default mythsController