const Profile = require("../models/Profile");


exports.createProfile = async (data) => {
    const profile = new Profile(data);
    return await profile.save();
};

exports.updateProfile = async(profileId,updatedData)=>{
    const profile = await Profile.findById({id : profileId});
    if (updatedData.userId) {
        this.userId = updatedData.userId;
    }

    if (updatedData.image) {
        this.image = updatedData.image;
    }


    if (updatedData.about) {
        this.about = updatedData.about;
    }

    await this.save();
    return Profile.findById({id : profileId});

};


exports.getProfileByUser = async (profileId) => {
    return await Profile.find({ id : profileId });
};

exports.getAllProfile = async () => {
    return await Profile.find({});
};

exports.deleteProfile = async (profileId) => {
    return await Profile.findByIdAndDelete({id : profileId});
};