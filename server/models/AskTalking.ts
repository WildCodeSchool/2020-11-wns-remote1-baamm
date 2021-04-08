import mongoose from 'mongoose';
import User from './User';

const askTalkingSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    user: {
        type: User,
    },
    interventionType: {
        type: String,
        required: true,
        max: 100,
        min: 6
    },
    askingDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Asktalking', askTalkingSchema);
