import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name required'],
        trim: true, 
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, 'Subscription price required'],
        min: [0, 'Price must be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'EUR','GBP'],
        default: 'INR',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['sports', 'movies', 'lifestyle', 'entertainment', 'knowledge', 'finance', 'technology', 'politics', 'other'],
        required: true, 
    },
    paymentMethod: {
        type: String, 
        required: true,
        trim: true, 
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date, 
        required: true, 
        validate: {
            validator: (value) => value <= new Date(), 
            message: 'Start date must be in the past'
        }
    },
    renewalDate: {
        type: Date, 
        validate: {
            validator: function (value){
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, 
    }
}, { timestamps: true });

//Auto calc renewal date if not provided!
subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1, 
            weekly: 7,
            monthly: 30, 
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

        //Auto update status also
        if(this.renewalDate < new Date()){
            this.status = 'expired';
        }
    }

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
