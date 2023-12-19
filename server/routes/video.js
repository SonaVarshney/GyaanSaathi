import express from 'express'; 

const router = express.Router(); 

import { fetchVideos, fetchVideosFaculty, fetchVideosClass, addVideos, updateVideo, deleteVideo } from "../controllers/video.js";

router.get('/', fetchVideos);
router.get('/faculty/:id', fetchVideosFaculty); 
router.get('/student/:id', fetchVideosClass); 
router.post('/', addVideos); 
router.put('/:id', updateVideo);  //id is video id
router.delete('/:id', deleteVideo); 

export default router; 