import { EventEmitter } from "events";
import { Activity } from "../../typeorm/entities/activity.entity";

class ActivityEventEmitter extends EventEmitter {
  constructor() {
    super();
  }

  public emitActivityEvent(data: Activity) {
    this.emit("activityEvent", data);
  }
}

export default ActivityEventEmitter;
