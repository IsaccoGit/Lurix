global.updateLurix = function () {
	database.collection('lurix').updateOne({}, { $set: lurix });
}