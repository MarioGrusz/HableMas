import { 
    createFlashcardSet,
    retriveLatestFlashcardSet,
    getAllFlashcardSetDateHeaders,
    getFlashcardSetById
} from "../services/flashcard.service.js";
  
  

/**
 * @desc   get latest flashcard set
 * @route  GET /api/v1/flashcard
 * @access private
*/
  
  
const getLatestFlashcardSetController = async (req, res, next) => {

    try{
        const uid = req.uid;
        const flashcardSet = await retriveLatestFlashcardSet(uid);
        res.status(200).json(flashcardSet);

    } catch (error) {
        next(error);
    }
};
  
  

/**
 * @desc   get flashcardSet by id
 * @route  GET /api/v1/flashcard/:id
 * @access private
*/
  
  
const getFlashcardSetByIdController = async (req, res, next) => {
  
    try{
        const productId =  decodeURIComponent(req.params.id);
        const uid = req.uid;
        console.log({uid, productId})
        const flashcardSet = await getFlashcardSetById(uid, productId);
        res.status(200).json(flashcardSet);
  
    } catch (error) {
      next(error)
    }
};
  
  

/**
 * @desc   get all flashcardSet dates
 * @route  GET /api/v1/flashcard/date
 * @access private
*/
  
  
const getAllFlashcardHeadersController = async (req, res, next) => {
  
    try{
        const uid = req.uid;
        const flashcardSetDates = await getAllFlashcardSetDateHeaders(uid);
        res.status(200).json(flashcardSetDates);
  
    } catch (error) {
      next(error)
    }
};
  
  

/**
 * @desc   create flashcardSet and save to database
 * @route  POST /api/v1/flashcard/new
 * @access private
*/
  
  
const createFlashcardSetAndSaveController = async (req, res, next) => {
   
    try{
        const uid = req.uid;
        const flashcardSet = await createFlashcardSet(uid);
        res.status(200).json({ message: 'flashcardSet added'});
  
    } catch (error) {
      next(error)
    }
};


export {
    getLatestFlashcardSetController,
    getFlashcardSetByIdController,
    getAllFlashcardHeadersController,
    createFlashcardSetAndSaveController,
}
  
