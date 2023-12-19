import { Schema, model, models, Types} from "mongoose";

interface IEvent extends Document {
    _id: string,
    title: string;
    description?: string;
    location?: string;
    createdAt: string;
    imageUrl?: string;
    startDateTime: string;
    endDateTime: string;
    price?: string;
    isFree: boolean;
    url?: string;
    category: {_id: string, name: string}; 
    organizer: {_id: string, firstName: string, lastName: string}; 
}

const EventSchema = new Schema({
    title: {type: 'string', required: true},
    description: {type: 'string'},
    location: {type: 'string'}, 
    createdAt: {type: 'string', default: Date.now},
    imageUrl: {type: 'string'},
    startDateTime: {type: 'string', default: Date.now},
    endDateTime: {type: 'string', default: Date.now},
    price: {type: 'string'},
    isFree: {type: 'boolean', default: false},
    url: {type: 'string'},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    organizer: {type: Schema.Types.ObjectId, ref: 'Organizer'}
});

const Event = models.Event || model("Event", EventSchema)