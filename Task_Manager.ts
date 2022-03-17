export class Project {
    public allTaskSList: Array<Task> = [];
    public resource: Array<Resource> = [];
    public users: Array<User> = []

    constructor() {
    }

    public addTask(task: Task) { }

    public deleteTask(taskid: string) { }

    public getAllTasks() { }

    public addResource(resource: Resource) { }

    public removeResource(resourceid: string) { }

    public getAllResources() { }

    public getAllUsers(): Array<User> {
        return this.users;
    }
}

export class User extends Project {
    public userid: string;
    public password: string;
    public name: string;
    public role: string;
    public schedule: number;

    constructor(userid: string, password: string, name: string, role: string, schedule: number) {
        super();
        this.userid = userid;
        this.password = password;
        this.name = name;
        this.role = role;
        this.schedule = schedule;
    }

    public getUser(userid: string) { }

    public getUserTasks() { }  //returns taskList for user
}


export class Task extends Project {
    public taskid: string;
    public taskName: string;
    public totalTimeEstimate: number;
    public timeLogged: number = 0;
    public ownerid: string;
    public status: TaskStatus = TaskStatus.Open;
    public dependencies: Array<string> = [];
    public resourceType: string;
    public userRole: string;


    constructor(taskid: string, taskName: string, totalTimeEstimate: number, ownerid: string, resourceType: string, userRole: string) {
        super();
        this.taskid = taskid;
        this.taskName = taskName;
        this.totalTimeEstimate = totalTimeEstimate;
        this.ownerid = ownerid;
        this.resourceType=resourceType;
        this.userRole=userRole;
    }

    public getTask(taskid: string) { }

    public logWork(hours: number) { }

    public getRemainingTime(): number {
        return (this.totalTimeEstimate - this.timeLogged)
    }

    public getTimeLogged() { }

    public updateTaskStatus(status: TaskStatus) { }

    public assignTask(userid: string) { }

    public unassignTask() { }

    public updateTask(updatedTask: Task) { }

    public checkStatus() { }

    public timeToComplete(): number | boolean {
        const user = super.getAllUsers().find(element => element['userid'] == this.ownerid);
        if (this.dependencies.length > 0 && this.checkStatus)
            if (user && this.dependencies.length == 0) {
                const schedule = user['schedule'];
                const remainingHours = this.getRemainingTime();
                const daysNeeded = remainingHours / schedule;
                return daysNeeded;
            }
            else
                return false;

    }

    public addDependency(taskid: string) { }

    public checkCompletionByDate(date: Date): boolean {
        const daysNeeded = this.timeToComplete();
        const oneDay = 24 * 60 * 60 * 1000;
        const remainingDays = (date.valueOf() - Date.now()) / oneDay;
        return (daysNeeded ? (daysNeeded <= remainingDays) : false);
    }
}

export class Resource extends Project {
    public resourceid: string;
    public resourcename: string;
    public userid: string = '';
    public inUse: boolean = false;

    constructor(resourceid: string, resourcename: string) {
        super();
        this.resourceid = resourceid;
        this.resourcename = resourcename;
    }

    public getResource(resourceid: string) { }

    public allocate(userid: string) { }

    public deAllocate() { }
}

enum TaskStatus {
    Blocked,
    Open,
    InProgress,
    Completed,
    Reopened,
    Closed
}
