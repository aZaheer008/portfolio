
const BaseModel = require('./BaseModel');

class Portfolio extends BaseModel {

    constructor(model, user) {
        super(model, user);
        this.writeRights = ['instructor', 'admin'];
    }

    async getRandoms(limit) {
        const query = await super.getRandoms(limit);
        return query().populate('user');
    }  

    getAll() {
        return this.Model.find({});
    }

    async getAllByUser() {
        return this.Model.find({user: this.user._id}).sort({startDate: 'desc'});;
      }

    getById(id){
        return this.Model.findById(id);
    }

    create(data) {
        if (!this.user || !this.writeRights.includes(this.user.role)){
            throw new Error('Not Authorized!');
        }
        data.user = this.user;
        return this.Model.create(data);
    }

    findAndUpdate(id, data) {
        return this.Model.findOneAndUpdate({_id:id}, data, {new:true, runValidators : true});
    }

    findAndDelete(id) {
        return this.Model.findOneAndRemove({_id : id});
    }
}

module.exports = Portfolio;