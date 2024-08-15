import * as SQLite from "expo-sqlite";

export interface Workout {
    Id: number;
    IsFav: number;
    Name: string;
}

export interface WorkoutDay {
    Id: number;
    Day: string;
    Workout: number;
}

export interface Excersise {
    Id: number;
    Name: string;
    Reps: number;
    Sets: number;
    WorkoutDay: number;
    OrderNumber: string;
}

export interface FavouriteWorkout {
    Id: number;
    WorkoutName: string;
    WorkoutId: number;
    CurrentDay: number;
    CurrentSet: number;
    CurrentExcersise: number;
}

const workoutTableSchema = `
    CREATE TABLE IF NOT EXISTS Workout (
        Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        Name TEXT UNIQUE NOT NULL
    );
  `;

const workoutDayTableSchema = `
   CREATE TABLE IF NOT EXISTS WorkoutDay (
      Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      Day TEXT NOT NULL,
      Workout INTEGER NOT NULL,
      FOREIGN KEY (Workout) REFERENCES Workout(Id) ON DELETE CASCADE
   )
  `;

//could add a link to a video or something here
//order is text to allow for drag and drop updating, eg 100,200 can do 99 drag and drop before have to reposition all above
const excersiseTableSchema = `
   CREATE TABLE IF NOT EXISTS Excersise (
      Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      Name TEXT NOT NULL,
      Reps INTEGER NOT NULL,
      Sets INTEGER NOT NULL,
      WorkoutDay INTEGER NOT NULL,
      OrderNumber TEXT NOT NULL,
      FOREIGN KEY (WorkoutDay) REFERENCES WorkoutDay(Id) ON DELETE CASCADE
   )
  `;

const favouriteWorkoutTableSchema = `
    CREATE TABLE IF NOT EXISTS FavouriteWorkout (
        Id INTEGER PRIMARY KEY NOT NULL,
        WorkoutId INTEGER NOT NULL ,
        WorkoutName TEXT NOT NULL,
        CurrentDay INTEGER NOT NULL ,
        CurrentSet INTEGER NOT NULL ,
        CurrentExcersise INTEGER NOT NULL ,
        FOREIGN KEY (WorkoutId) REFERENCES Workout(Id) ON DELETE CASCADE
    );
  `;

export const WorkoutTable: string = "Workout";
export const WorkoutDayTable: string = "WorkoutDay";
export const ExcersiseTable: string = "Excersise";
export const FavouriteWorkoutTable: string = "FavouriteWorkout";

var db: SQLite.SQLiteDatabase;
var dataBaseLoaded = false;
const dataBaseName = "EZCNTDataBase";

//creates data bases
export const initializeDatabase = async () => {
    try {
        db = await SQLite.openDatabaseAsync(dataBaseName);
        dataBaseLoaded = true;
        await db.execAsync("PRAGMA foreign_keys = ON");
        await db.execAsync(workoutTableSchema);
        await db.execAsync(workoutDayTableSchema);
        await db.execAsync(excersiseTableSchema);
        await db.execAsync(favouriteWorkoutTableSchema);
    } catch (error) {
        console.error("error creating database: ", error);
    }
};

export const getRecord = async (
    table: string,
    ItemId: number,
): Promise<Workout | WorkoutDay | FavouriteWorkout | Excersise | null> => {
    var s = "SELECT * FROM " + table + " WHERE Id = " + ItemId;
    try {
        const result = await db.getFirstAsync(s);
        return result as
            | Workout
            | WorkoutDay
            | FavouriteWorkout
            | Excersise
            | null;
    } catch (error) {
        console.error(
            "error get Item " +
                ItemId +
                " From " +
                table +
                "sql command was: " +
                s +
                " error:",
            error,
        );
    }
    return null;
};

export const addWorkout = async (Name: string) => {
    var s = 'INSERT INTO Workout (Name) VALUES ("' + Name + '");';
    try {
        const result = await db.runAsync(s);
        return result.lastInsertRowId;
    } catch (error) {
        console.error("error inserting workout " + Name + " :", error);
    }
    return null;
};

export const deleteRecord = async (table: string, ItemId: number) => {
    var s = "DELETE FROM " + table + " WHERE Id = " + ItemId;
    try {
        await db.runAsync(s);
    } catch (error) {
        console.error(
            "error delete Item " + ItemId + " From " + table + " :",
            error,
        );
    }
};

export const getWorkouts = async (): Promise<Workout[]> => {
    try {
        const query: Workout[] = await db.getAllAsync("SELECT * FROM Workout;");
        return query == null ? [] : query;
    } catch (error) {
        console.error("error getting workouts :", error);
    }
    return [];
};

export const addWorkoutDay = async (day_id: string, workoutId: number) => {
    var s =
        'INSERT INTO WorkoutDay (Day,Workout) VALUES ("' +
        day_id +
        '",' +
        workoutId +
        ");";
    try {
        await db.runAsync(s);
    } catch (error) {
        console.error(
            "error adding workout day with day " +
                day_id +
                "  workout  id: " +
                workoutId +
                " :",
            error,
        );
    }
};

export const addExcersise = async (
    Name: string,
    workoutDayId: number,
    Reps: number,
    Sets: number,
    Order: string,
) => {
    var s =
        'INSERT INTO Excersise (Name,Reps,Sets,WorkoutDay,OrderNumber) VALUES ("' +
        Name +
        '",' +
        Reps +
        "," +
        Sets +
        "," +
        workoutDayId +
        ',"' +
        Order +
        '");';

    try {
        const result = await db.runAsync(s);
        return result.lastInsertRowId;
    } catch (error) {
        console.error(
            "error adding excersise  with name " +
                Name +
                "  workoutDay  id: " +
                workoutDayId +
                " reps: " +
                Reps +
                " :",
            error,
        );
    }
    return null;
};

export const getWorkoutDays = async (
    Workout_id: number,
): Promise<WorkoutDay[]> => {
    try {
        const query: WorkoutDay[] = await db.getAllAsync(
            "SELECT * FROM WorkoutDay WHERE Workout = " + Workout_id + ";",
        );
        return query == null ? [] : query;
    } catch (error) {
        console.error(
            "error retrieving workoutDays for workout : " +
                Workout_id +
                " error message: ",
            error,
        );
    }
    return [];
};

export const getExercises = async (
    Workout_day_id: number,
): Promise<Excersise[]> => {
    try {
        const query: Excersise[] = await db.getAllAsync(
            "SELECT * FROM Excersise WHERE WorkoutDay = " +
                Workout_day_id +
                " ORDER BY OrderNumber ASC;",
        );
        return query == null ? [] : query;
    } catch (error) {
        console.error(
            "error retrieving excersises for workoutDay : " +
                Workout_day_id +
                " error message: ",
            error,
        );
    }
    return [];
};

export const updateExcersisesRepCount = async (
    Excersise_id: number,
    newCount: number,
) => {
    var s =
        "UPDATE " +
        ExcersiseTable +
        " SET Reps = " +
        newCount +
        " WHERE Id = " +
        Excersise_id +
        ";";
    try {
        await db.runAsync(s);
    } catch (error) {
        console.error(
            "failed update excersise " +
                Excersise_id +
                " sets to new value " +
                newCount +
                " error message:",
            error,
        );
    }
};

export const updateExcersisesSetCount = async (
    Excersise_id: number,
    newCount: number,
) => {
    var s =
        "UPDATE " +
        ExcersiseTable +
        " SET Sets = " +
        newCount +
        " WHERE Id = " +
        Excersise_id +
        ";";
    try {
        await db.runAsync(s);
    } catch (error) {
        console.error(
            "failed update excersise " +
                Excersise_id +
                " reps to new value " +
                newCount +
                " error message:",
            error,
        );
    }
};

export const getFavouriteWorkout =
    async (): Promise<FavouriteWorkout | null> => {
        try {
            if (dataBaseLoaded == false) return null;
            const query: FavouriteWorkout | null = await db.getFirstAsync(
                "SELECT * FROM FavouriteWorkout;",
            );
            return query;
        } catch (error) {
            console.error("failed to retrieve favourite workout: ", error);
        }
        return null;
    };

export const setNewFavouriteWorkout = async (
    workout_id: number,
    workoutName: string,
) => {
    var s =
        "REPLACE INTO FavouriteWorkout (Id, WorkoutId, CurrentDay, CurrentSet,CurrentExcersise,WorkoutName) VALUES (1," +
        workout_id +
        ', 0,0,0,"' +
        workoutName +
        '");';
    try {
        await db.runAsync(s);
    } catch (error) {
        console.error(
            "error setting workout: " + workout_id + " as favourite :",
            error,
        );
    }
};

export const updateFavouriteWorkoutSet = async (newSetNum: number) => {
    var s =
        "UPDATE " +
        FavouriteWorkoutTable +
        " SET CurrentSet = " +
        newSetNum +
        " WHERE Id = " +
        1 +
        ";";
    try {
        await db.runAsync(s);
    } catch (error) {
        console.error(
            "failed to update favworkout sets to new value " +
                newSetNum +
                " error message:",
            error,
        );
    }
};

export const updateFavouriteWorkoutExcersise = async (
    newExcersiseNum: number,
) => {
    var s =
        "UPDATE " +
        FavouriteWorkoutTable +
        " SET CurrentExcersise = " +
        newExcersiseNum +
        " WHERE Id = " +
        1 +
        ";";
    try {
        await db.runAsync(s);
    } catch (error) {
        console.error(
            "failed to update favworkout excersise number to new value " +
                newExcersiseNum +
                " error message:",
            error,
        );
    }
};
