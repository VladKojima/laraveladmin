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
// import { aboutPageSchema } from './user';

export const schemas = {
    aboutPage: aboutPageSchema,
    bonusPoints: bonusPointsSchema,
    dish: dishSchema,
    event: eventSchema,
    feedback: feedbackSchema,
    hall: hallSchema,
    payment: paymentSchema,
    promotion: promotionSchema,
    receipt: receiptSchema,
    table: tableSchema
};