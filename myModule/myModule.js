var myName = 'Arif';
// 1st way to exports
exports.myModule = function () {
    return 'I am a new Module. Not build in';
};

module.exports.myName = myName; //2nd way to export