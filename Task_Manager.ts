export class Project {                               //Parent class of all the other classes. Represnts the whole project. Contains project level attributes and functions
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

export class User extends Project {                 //Class representing Users working on tasks (including the manager)
    public userid: string;
    public password: string;
    public name: string;
    public role: string;                            //Attribute representing the role/type of user. Manager will have role as "Manager"
    public schedule: number;                        //Represents the number of hours the user works per day

    constructor(userid: string, password: string, name: string, role: string, schedule: number) {
        super();
        this.userid = userid;
        this.password = password;
        this.name = name;
        this.role = role;
        this.schedule = schedule;
    }

    public getUser(userid: string) { }

    public getUserTasks() { }                      //Returns list of all tasks assigned to user. This function will call the getAllTasks() function and check for tasks assigned to user from there
}


export class Task extends Project {               //Class representing the tasks
    public taskid: string;
    public taskName: string;
    public totalTimeEstimate: number;             //Represents the initial estimated time to complete task
    public timeLogged: number = 0;                //Represents he time logged on the task till now
    public ownerid: string;                       //Stores userid of assigned user
    public status: TaskStatus = TaskStatus.Open;  //Stores status of task. Uses the enum TaskStatus to store status from a set of predefined statuses
    public dependencies: Array<string> = [];      //Stores list of ids of tasks which this task has dependencies on
    public resourceType: string;                  //Stores type of resource, if any, required for task
    public userRole: string;                      //Stores he role of user assigned to the task


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

    public logWork(hours: number) { }                          //Faciliates logging work hours against the task

    public getRemainingTime(): number {                        //Returns work hours remaining for the task
        return (this.totalTimeEstimate - this.timeLogged)
    }

    public getTimeLogged() { }

    public updateTaskStatus(status: TaskStatus) { }           

    public assignTask(userid: string) { }                     //Assigns task to a user

    public unassignTask() { }

    public updateTask(updatedTask: Task) { }                  //Allows to update any/multiple attribute of the task

    public checkStatus() : TaskStatus {
        /*Code to check current status based on
         completion status of dependencies.
          Can be simplified using Observables*/
        return this.status
     }

    public timeToComplete(): number | boolean {                                                    //Returns furher number of days required to complete the task. Returns false if no user is assigned or task is in blocked status (dependencies pending)
        const user = super.getAllUsers().find(element => element['userid'] == this.ownerid);
            if (user && this.checkStatus()!=TaskStatus.Blocked) {
                const schedule = user['schedule'];
                const remainingHours = this.getRemainingTime();
                const daysNeeded = remainingHours / schedule;
                return daysNeeded;
            }
            else
                return false;

    }

    public addDependency(taskid: string) { }

    public checkCompletionByDate(date: Date): boolean {                      //REQUIRED FUNCTION TO CHECK WHETHER THE TASK CAN BE COMPLETED WITHIN GIVEN DATE. ASSUMES THAT THE TASK BEGINS TODAY OR HAS ALREADY BEGUN
        const daysNeeded = this.timeToComplete();
        const oneDay = 24 * 60 * 60 * 1000;
        const remainingDays = (date.valueOf() - Date.now()) / oneDay;
        return (daysNeeded ? (daysNeeded <= remainingDays) : false);
    }
}

export class Resource extends Project {                                      //Class representing various resource to be used for tasks
    public resourceid: string;
    public resourcename: string;
    public userid: string = '';
    public inUse: boolean = false;
    public resourceType: string;

    constructor(resourceid: string, resourcename: string, resourceType: string) {
        super();
        this.resourceid = resourceid;
        this.resourcename = resourcename;
        this.resourceType = resourceType;
    }

    public getResource(resourceid: string) { }

    public allocate(userid: string) { }

    public deAllocate() { }
}

enum TaskStatus {                                   //enum to define possible task statuses
    Blocked,                                        //Blocked represents status when dependency tasks are pending
    Open,                                           //Open represents status when all dependencies are clear and task is ready to begin
    InProgress,
    Completed,
    Reopened,                                       //Represents task status when a completed or closed task is reopened due to some defect
    Closed                                          //Represents task status when it is completed, verified and closed.
}
