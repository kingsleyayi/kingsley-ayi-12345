import { EventEmitter } from "events";
import { Activity } from "../../typeorm/entities/activity.entity";

class ActivityEventEmitter extends EventEmitter {}

export default ActivityEventEmitter;
