const GuestBookService = require('../services/GuestBookService');


exports.createGuestComment = async (req, res) => {
  try {

    const { content} = req.body;
    const { BlogId } = req.params;
    const AuthorId = req.id;

    console.log(AuthorId)
    const GuestBookData = {
      ownerId: BlogId,
      authorId: AuthorId,
      comment: content
    };
    const guestcomment = await GuestBookService.createGuestComment(GuestBookData);
    res.status(201).json(guestcomment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getGuestComment = async (req, res) => {
  try {
    const { BlogId } = req.params;
    const guestcomment = await GuestBookService.getGuestComment(BlogId);

    res.status(200).json(guestcomment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateGuestComment = async (req, res) => {
  try {
    const  { content }  = req.body;
    const  { ownerId, GuestBookId } = req.params;
    if(ownerId !== req.id){
      return res.status(403).json({ error: "You do not have permission to update this comment" });
    }

    const GuestBookData = {
      _id: GuestBookId,
      comment: content
    };
    const updatedComment = await GuestBookService.updateGuestComment(GuestBookData);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGuestComment = async (req, res) => {
  try {

    const { ownerId } = req.params.ownerId;
    if(ownerId !== req.id){
      return res.status(403).json({ error: "You do not have permission to update this comment" });
    }

    const { GuestBookId } = req.params;
    await GuestBookService.deleteGuestComment(GuestBookId);
    res.status(204).send("Succesfully Deleted");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

