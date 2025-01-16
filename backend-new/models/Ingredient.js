const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Malzeme adı gereklidir'],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Kategori gereklidir'],
    enum: ['Protein', 'Sebze', 'Tahıl', 'Bakliyat', 'Baharat', 'Sos']
  },
  nutrition: {
    calories: {
      type: Number,
      required: true,
      min: 0
    },
    protein: {
      type: Number,
      required: true,
      min: 0
    },
    carbs: {
      type: Number,
      required: true,
      min: 0
    },
    fat: {
      type: Number,
      required: true,
      min: 0
    }
  },
  imageUrl: {
    type: String,
    required: [true, 'Malzeme görseli gereklidir']
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtüel alan: Toplam kalori
ingredientSchema.virtual('totalCalories').get(function() {
  return this.nutrition.calories;
});

// Pre-save middleware: Kalori hesaplama
ingredientSchema.pre('save', function(next) {
  // Protein: 4 cal/g, Karbonhidrat: 4 cal/g, Yağ: 9 cal/g
  const calculatedCalories = 
    (this.nutrition.protein * 4) + 
    (this.nutrition.carbs * 4) + 
    (this.nutrition.fat * 9);
  
  // Hesaplanan kalori ile girilen kalori arasında büyük fark varsa uyar
  if (Math.abs(this.nutrition.calories - calculatedCalories) > 10) {
    console.warn(`Uyarı: ${this.name} için hesaplanan kalori (${calculatedCalories}) ile girilen kalori (${this.nutrition.calories}) arasında fark var.`);
  }
  
  next();
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient; 