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
    public desination: Designation;
    public schedule: number;

    constructor(userid: string, password: string, name: string, designation: Designation, schedule: number) {
        super();
        this.userid = userid;
        this.password = password;
        this.name = name;
        this.desination = designation;
        this.schedule = schedule;
    }

    public getUser(userid: string) { }

    public assignTask(taskid: string) { }

    public unassignTask(taskid: string) { }

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


    constructor(taskid: string, taskName: string, totalTimeEstimate: number, ownerid: string) {
        super();
        this.taskid = taskid;
        this.taskName = taskName;
        this.totalTimeEstimate = totalTimeEstimate;
        this.ownerid = ownerid
    }

    public getTask(taskid: string) { }

    public logWork(hours: number) { }

    public getRemainingTime(): number {
        return (this.totalTimeEstimate - this.timeLogged)
    }

    public getTimeLogged() { }

    public updateTaskStatus(status: TaskStatus) { }

    public updateTask(updatedTask: Task) { }

    public checkStatus() { }

    public addDependency(taskid: string) { }

    public checkCompletionByDate(date: Date): boolean {
        const user = super.getAllUsers().find(element => element['userid'] == this.ownerid);
        if (user && this.dependencies.length == 0) {
            const schedule = user['schedule'];
            const remainingHours = this.getRemainingTime();
            const daysNeeded = remainingHours / schedule;
            const oneDay = 24 * 60 * 60 * 1000;
            const remainingDays = (date.valueOf() - Date.now()) / oneDay;
            return (daysNeeded <= remainingDays);
        }
        else
            return false;
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

enum Designation {
    Manager,
    User
}

enum TaskStatus {
    Blocked,
    Open,
    InProgress,
    Completed,
    Reopened,
    Closed
}
