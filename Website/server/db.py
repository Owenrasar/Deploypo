import sqlite3
import os

def dict_factory(cursor, row):
    fields = []
    for column in cursor.description:
        fields.append(column[0])

    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict


class DB:
    def __init__(self,dbfilename):
        self.dbfilename = dbfilename
        db_path = os.path.join(os.path.dirname(__file__), dbfilename)
        self.connection = sqlite3.connect(db_path)
        self.cursor = self.connection.cursor()
    
    def readAllRecords(self):
        self.cursor.execute("SELECT * FROM messages")
        rows = self.cursor.fetchall()
        all = []
        for row in rows:
            d= dict_factory(self.cursor,row)
            all.append(d)

        print("the rows are: ", all)
        return all
    
    def readSingleRecord(self,id):
        self.cursor.execute("SELECT * FROM messages WHERE id = ?", (id,))
        print("getting single...")
        rows = self.cursor.fetchall()
        all = []
        for row in rows:
            d= dict_factory(self.cursor,row)
            all.append(d)

        print("the row is: ", all)
        return all


    def saveRecord(self,record):
        #self.cursor.execute("INSERT INTO messages (username, password) VALUES ('bobert', '4321')")
        data = [record["username"],record["password"]]
        self.cursor.execute("INSERT INTO messages (username, password) VALUES (?,?)",data)
        self.connection.commit()

    def editRecord(self,id,record):
        data = [record["username"],record["password"],id]
        self.cursor.execute("UPDATE messages SET username=?, password=? WHERE id = ?;",data)
        self.connection.commit()

    def deleteRecord(self, id):
        self.cursor.execute("DELETE FROM messages WHERE id = ?;",[id])
        self.connection.commit()

    def close(self):
        self.connection.close()

if __name__ == "__main__":
    db = DB("messages.db")
    db.readAllRecords()
    #db.saveRecord()
    db.readAllRecords()
    db.close()