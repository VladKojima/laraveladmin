import { aboutPageSchema } from './aboutPage';
import { bonusPointsSchema } from './bonusPoints';
import { dishSchema } from './dish';
import { eventSchema } from './event';
import { feedbackSchema } from './feedback';
import { hallSchema } from './hall';
import { paymentSchema } from './payment';
import { promotionSchema } from './promotion';
import { receiptSchema } from './receipt';
// import { aboutPageSchema } from './reservation';
import { tableSchema } from './table';
import { userSchema } from './user';
// import { aboutPageSchema } from './user';

export const schemas = {
    BonusPoints: bonusPointsSchema,
    Dish: dishSchema,
    Event: eventSchema,
    Feedback: feedbackSchema,
    Hall: hallSchema,
    Payment: paymentSchema,
    Promotion: promotionSchema,
    Receipt: receiptSchema,
    Table: tableSchema,
    User: userSchema,
};