const GuestBook = require('../models/guestbook');
const Profile = require('../models/Profile');

exports.createGuestComment = async (data) => {
    const guestBook = new GuestBook(data);
    console.log(guestBook)
    return await guestBook.save();
};

exports.getGuestComment = async (ownerId) => {
    const comments = await GuestBook.find({ ownerId: ownerId }).sort({ createdAt: -1 }).lean();
    for (let comment of comments) {
        const profile = await Profile.findOne({ id: comment.authorId });
        if (profile) {
            comment.authorProfile = profile;
        }
    }
    return comments;
};

exports.updateGuestComment = async (data) => {
    const { _id, comment } = data;

    const updatedGuestBook = await GuestBook.findOneAndUpdate(
        { _id: _id },
        { comment: comment },
        { new: true }
    );

    if (!updatedGuestBook) {
        throw new Error('No guestbook found or you are not the author.');
    }

    return updatedGuestBook;
};

exports.deleteGuestComment = async (guestbookId) => {
    const deletedGuestBook = await GuestBook.findOneAndDelete({ _id: guestbookId });

    if (!deletedGuestBook) {
        throw new Error('No guestbook found or you are not the author.');
    }

    return deletedGuestBook;
};


