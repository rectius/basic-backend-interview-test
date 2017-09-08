import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from './error/APIError';

/**
 * Near Earth Object Schema
 */
const NeoSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    year: {
        type: Number,
        required: false
    },
    month: {
        type: Number,
        required: false
    },
    reference: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    speed: {
        type: String,
        required: true
    },
    isHazardous: {
        type: Boolean,
        required: true
    }
});

/**
 * Methods
 */
NeoSchema.method({
});

/**
 * Statics
 */
NeoSchema.statics = {
  /**
   * Gets potentially hazardous asteroids.
   * @returns {Promise<Neo[]>}
   */
  getHazardous() {
      return this.find({ isHazardous: true })        
  },

  /**
   * Get the fastest asteroid.
   * @param {boolean} hazardous - true means is hazardous. Default false.
   * @returns {Promise<Neo[]>}
   */
  getFastest(hazardous) {
      return this.findOne({ isHazardous: hazardous === 'true' }).sort({ speed: -1 })
  },

  /**
   * Get a year with most asteroids.
   * @param {boolean} hazardous - true means is hazardous. Default false.
   * @returns {Promise<Neo[]>}
   */
  getBestYear(hazardous) {
    const aggregatorOpts = [
        { 
            $match: { isHazardous: hazardous === 'true' } 
        },
        {
            $group: {
                _id: '$year',
                count: { $sum: 1 }
            }
        }
    ]    
    return this.aggregate(aggregatorOpts).sort({ count: -1 })
  },

  /**
   * Get a month with most asteroids (not a month in a year).
   * @param {boolean} hazardous - true means is hazardous. Default false.
   * @returns {Promise<Neo[]>}
   */
  getBestMonth(hazardous) {
    const aggregatorOpts = [
        { 
            $match: { isHazardous: hazardous === 'true' } 
        },
        {
            $group: {
                _id: '$month',
                count: { $sum: 1 }
            }
        }
    ]    
    return this.aggregate(aggregatorOpts).sort({ count: -1 })    
  }
};

/**
 * @typedef Neo
 */
export default mongoose.model('Neo', NeoSchema);