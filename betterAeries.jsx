import React, { Component } from 'react';
import { TextInput, AppRegistry, Image, Text, View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reshapeOneToTwo(one,dim){
    let arr = []
    let count = 0
    
    for(let i=0; i< dim[0];i++){
        let row = []
        for(let j=0; j<dim[1];j++){
            row.push(one[count])
            count = count + 1
        }
        arr.push(row)
    }
    return arr
}

function stringifyRow(row){
    let bruh = []
    for(let i=0; i<row.length; i++){
        if(row[i] === null){
            bruh.push("    ")
        }else if(row[i].toString().length === 1){
            bruh.push(row[i].toString() + "  ")
        }else{
            bruh.push(row[i].toString())
        }
    }
    return bruh
}

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            screen: "Gradebook",
            account: {
                firstName: "Erin",
                lastName: "A. Lee",
                age: 17,
                gender: "Female",
                id: 103253,
                gradYear: 2022,
                school: "Oxford Academy"
            },
            accountBuffer: {
                firstName: "Erin",
                lastName: "A. Lee",
                age: 17,
                gender: "Female",
                id: 103253,
                gradYear: 2022,
                school: "Oxford Academy"
            },
            selectedClass: null,
            renderMonth: true,
            savedMessage: false,
        }
        
    }

    //renders Individual Items for Assignments and Tests if class is selected
    renderItem(item){
        let name = item.name
        let points = item.points
        let outOf = item.outOf
        let description = item.description

        let nameStyle = {
            fontSize: 10,
            fontWeight: 'bold',
            left: 10
        }
        let pointsStyle = {
            fontSize: 10,
            position: 'absolute',
            right: 0,
        }
        let descriptionStyle = {
            fontSize: 6
        }
        return(
            <View>
                <Text style={nameStyle}>{name}</Text>
                <Text style={pointsStyle}>{points}/{outOf}</Text>
                <Text style={descriptionStyle}>{description}</Text>
            </View>
        );
    }
    
    //renders Assignments and Tests if class is selected
    renderThings(type, list){
        let typeStyle = {
            fontSize: 20,
            textDecoration: 'underline',
            fontWeight: 'bold'
        }
        
        return(
            <View>
                <Text style={typeStyle}>{type}</Text><Text>{"\n"}</Text>
                {list.map(item=>this.renderItem(item))}
            </View>    
        );
    }
    
    //renders Individual Classes
    renderIndividualClass(thing){
        let className = thing.name
        let teacher = thing.teacher
        let letterGrade = thing.letterGrade
        
        let backgroundColor = null
        if(letterGrade === 'A'){backgroundColor = "#50C878"}
        else if(letterGrade === 'B'){backgroundColor = "#AFE1AF"}
        else if(letterGrade === 'C'){backgroundColor = "#DFFF00"}
        else if(letterGrade === 'D'){backgroundColor = "#E4D00A"}
        else{backgroundColor = "#FF5733 "}
        
        let gradebookViewStyle = {
            height: 35,
            width: deviceWidth
        }
        let gradeStyle={
            position: 'absolute',
            height: 35,
            width: 35,
            fontSize: 16,
            right: 0,
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            backgroundColor: backgroundColor
        }
        let classStyle={
            fontSize: 20,
            fontWeight: 'bold',
        }
        
        return(
            <TouchableHighlight onPress={() => this.setState({selectedClass: thing})}>
                <View style={gradebookViewStyle}>
                    <Text style={gradeStyle}>{thing.letterGrade}</Text>
                    <Text style={classStyle}>{className}</Text>
                    <Text>{teacher}</Text>
                </View>
            </TouchableHighlight>    
        );
    }
    //renders all Classes
    renderClasses(classes){
        return(
            <View>
                {classes.map(indClass => this.renderIndividualClass(indClass))}
            </View>
        );
    }
    //######### Renders GradeBook Screen/ Renders selected Class if selected
    renderGradebook(){
        if(this.state.selectedClass===null){
            let classes = gradebook.classes
            let gpa = gradebook.gpa
            
            let gpaStyle = {
                fontWeight: 'bold'
            }
            
            return(
                <View>
                    {this.renderClasses(classes)}
                    <Text>{"\n"}</Text>
                    <View>
                        <Text style={gpaStyle}>GPA:  </Text>
                        <Text style={{position: 'absolute', left: 40}}>{gpa}</Text>
                    </View>
                </View>    
            );
        }else{
            
            const {selectedClass} = this.state
            let className = selectedClass.name
            let teacher = selectedClass.teacher
            let assignments = selectedClass.assignments
            let tests = selectedClass.tests
            let letterGrade = selectedClass.letterGrade
            let grade = Math.floor(selectedClass.grade *1000)/10
            
            let backgroundColor = null
            if(letterGrade === 'A'){backgroundColor = "#50C878"}
            else if(letterGrade === 'B'){backgroundColor = "#AFE1AF"}
            else if(letterGrade === 'C'){backgroundColor = "#DFFF00"}
            else if(letterGrade === 'D'){backgroundColor = "#E4D00A"}
            else{backgroundColor = "#FF5733 "}
            
            let classStyle = {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 30
            }
            let teacherStyle = {
                textAlign: 'center',
                fontSize: 15
            }
            let letterStyle={
                position: 'absolute',
                right: 0,
                height: 40,
                width: 40,
                backgroundColor: backgroundColor,
                fontSize: 30,
                textAlign: 'center',
                fontWeight: 'bold'
            }
            let gradeStyle = {
                textAlign: 'center',
                fontWeight: 'bold'
            }
            let viewStyle={
                width: deviceWidth
            }
            return(
                <View style={viewStyle}>
                    <Text style={classStyle}>{className}</Text>
                    <Text style={letterStyle}>{letterGrade}</Text>
                    <Text style={teacherStyle}>{teacher}</Text>
                    <Text style={gradeStyle}>{grade}%</Text>
                    {this.renderThings("Tests",tests)}
                    {this.renderThings("Assignments",assignments)}
                </View>
            );
        }
        
    }
    
    //updates accountBuffer
    changeValue = (e, variable) => {
        const {accountBuffer} = this.state
        accountBuffer[variable] = e
        this.setState({accountBuffer: accountBuffer})
    }

    //######### Renders Account Screen
    renderAccount(){
        const {accountBuffer} = this.state
        let firstName = accountBuffer.firstName
        let lastName = accountBuffer.lastName
        let age = accountBuffer["age"]
        let gender = accountBuffer["gender"]
        let id = accountBuffer["id"]
        let gradYear = accountBuffer["gradYear"]
        let school = accountBuffer["school"]
        
        let labelStyle={
            fontWeight: 'bold'
        }
        let textStyl = {
            position: 'absolute',
            left: 40
        }
        
        return(
            <View>
                <View><Text style={labelStyle}>First Name:   </Text><TextInput onChangeText={(e) => this.changeValue(e, "firstName")} value={firstName}/></View>
                <View><Text style={labelStyle}>Last Name:   </Text><TextInput onChangeText={(e) => this.changeValue(e, "lastName")} value={lastName}/></View>
                <View><Text style={labelStyle}>Age:   </Text><TextInput onChangeText={(e) => this.changeValue(e, "age")} value={age}/></View>
                <View><Text style={labelStyle}>Gender:   </Text><TextInput onChangeText={(e) => this.changeValue(e, "gender")} value={gender}/></View>
                <View><Text style={labelStyle}>ID:   </Text><TextInput onChangeText={(e) => this.changeValue(e, "id")} value={id}/></View>
                <View><Text style={labelStyle}>Graduation Year:   </Text><TextInput onChangeText={(e) => this.changeValue(e, "gradYear")} value={gradYear}/></View>
                <View><Text style={labelStyle}>School:   </Text><TextInput onChangeText={(e) => this.changeValue(e, "school")} value={school}/></View>
                <Text>{"\n"}</Text>
                <TouchableHighlight style={styles.bigButton} onPress={() => {
                    const {accountBuffer} = this.state; 
                    let cops = {}
                    for(const feature in accountBuffer){cops[feature] = accountBuffer[feature]}
                    this.setState({account: cops, savedMessage: true})}
                }>
                    <Text>
                        Save
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
    
    //######### Renders Attendance Screen
    
    renderDay(day){
        if(day[1] !== null){
            let calendar = cally.calendar
            let absences = cally.absences
            let index = null
            
            for(let i=0; i<calendar.length; i++){
                for(let j=0; j<calendar[0].length; j++){
                    if(day[1] === calendar[i][j]){
                        index = [i,j]
                    }
                }
            }
            let absence = absences[index[0]][index[1]]
            let absenceString = null
            
            if(absence === 1){
                absenceString = "ABSENT"
            }else{
                absenceString = "PRESENT"
            }
            
            let dateStyle ={
                textDecoration: 'underline',
                fontWeight: 'bold'
            }
            let dayStyle={
                position: 'absolute',
                fontWeight: 'bold',
                left: 20
            }
            
            let absenceStyle= null
            if(absenceString === "ABSENT"){
                absenceStyle = {
                    color: 'red',
                    fontWeight: 'bold'
                }
            }else{
                absenceStyle = {}
            }
            
            return(
                <View>
                    <Text style={dateStyle}>{day[1]}</Text>
                    <Text style={dayStyle}>{day[0]}</Text>
                    <Text style={absenceStyle}>{absenceString}</Text><Text>{"\n"}</Text>
                </View>
            );
        }
        
    }
    
    renderWeek(week){
        let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday"]
        let extra = []
        for(let i=0; i<week.length;i++){
            extra.push([daysOfWeek[i],week[i]])
        }
        
        return(
            <View>
                <TouchableHighlight  onPress={()=>{this.setState({renderMonth:true})}}>
                    <Text style={styles.bigButton}>See Month</Text>
                </TouchableHighlight>
                <Text>{"\n"}</Text>
                {extra.map(day => this.renderDay(day))}
                
            </View>
        );
    }
    
    setRow(row){
        week = row
        this.setState({renderMonth: false})
    }
    
    renderRow(row){
        let stringRow = stringifyRow(row)
        
        let thingStyle = {
            fontWeight: 'bold'
        }
        return(
            <TouchableHighlight onPress={() => this.setRow(row)}>
                <Text style={thingStyle}>{stringRow[0]} {stringRow[1]} {stringRow[2]} {stringRow[3]} {stringRow[4]} {stringRow[5]} {stringRow[6]}</Text>
            </TouchableHighlight>    
        );
    }
    
    renderCalendar(calendar){
        let backStyle = {
            backgroundColor: 'lightgray',
        }
        
        return(
            <View style={backStyle}>
                {calendar.map(row => this.renderRow(row))}
            </View>  
        );
    }
    
    renderAttendance(){
        let calendar = cally.calendar
        let selectedWeek = week
        let strings = cally.stringCalendar
        
        let calendarStyle={
            width: deviceWidth/2,
            height: 25,
            fontSize: 20,
            backgroundColor: 'lightGreen',
            fontWeight: 'bold',
            textAlign: 'center',
        }
        
        if(this.state.renderMonth){
            return(
                <View>
                    <Text style={calendarStyle}>Calendar</Text>
                    <Text>{"\n\n"}</Text>
                    {this.renderCalendar(calendar)}
                    <Text>{"\n\n"}</Text>
                </View>    
            );
        }
        else{
            return(
                <View>
                    {this.renderWeek(selectedWeek)}
                </View>
            );
        }
        
    }
    
    //Renders Screen
    renderScreen(){
        if(this.state.screen === "Gradebook"){
            return(
                <View>
                    {this.renderGradebook()}
                </View>
            );
        }
        else if(this.state.screen === "Attendance"){
            return(
                <View>
                    {this.renderAttendance()}
                </View>
            );
        }
        else{
            return(
                <View>
                    {this.renderAccount()}
                </View>
            );
        }
    }
    
    //called every time navbar item is clicked on
    onSwitch(param){
        const {account} = this.state
        let cops = {}
        for(const feature in account){cops[feature] = account[feature]}
        this.setState({screen: param, accountBuffer: cops, selectedClass: null, savedMessage: false, renderMonth: false})
    }
    
    render() {
        return (
            <View>
                <View style={styles.navbarContainer}>
                        <TouchableHighlight onPress={()=>this.onSwitch("Gradebook")} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Gradebook
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>this.onSwitch("Attendance")} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Attendance
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>this.onSwitch("Account")} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Account
                            </Text>
                        </TouchableHighlight>
                    </View>
                <View style={styles.container}>
                    {this.renderScreen()}
                </View>
            </View>
        );
    }
}

class GradeBook{
    constructor(){
        this.classes = []
        this.gpa = 0   
    }
    addClass(Class){
        this.classes.push(Class)
    }
    calculateGPA(){
        let sum = 0
        let noClasses = this.classes.length
        for(let i=0; i<noClasses; i++){
            sum += this.classes[i].grade
        }
        this.gpa = sum / noClasses
    }
}

//############Initialize Classes
class Class{
    constructor(name, teacher){
        this.name = name
        this.teacher = teacher
        this.tests = []
        this.assignments = []
        this.grade = 0
        this.letterGrade = ''
    }
    setTests(lis){
        this.tests = lis
    }
    setAssignments(lis){
        this.assignments = lis
    }
    addTest(item){
        this.tests.push(item)
    }
    addAssignment(item){
        this.assignments.push(item)
    }
    calculateGrade(){
        let totalPoints = 0
        let outOfTotal = 0
        //loop through tests and assignments
        for(let i=0; i< this.tests.length; i++){
            totalPoints += this.tests[i].points
            outOfTotal += this.tests[i].outOf
        }
        for(let i=0; i< this.assignments.length; i++){
            totalPoints += this.assignments[i].points
            outOfTotal += this.assignments[i].outOf
        }
        this.grade = totalPoints/outOfTotal
        this.letterGrade = this.getLetterGrade(this.grade)
    }
    getLetterGrade(thing){
        if(thing>= 0.9){
            return 'A'
        }else if(thing >=0.8){
            return 'B'
        }else if(thing >= 0.7){
            return 'C'
        }else if(thing >= 0.6){
            return 'D'
        }else{
            return 'F'
        }
    }
}

class Item{
    constructor(name, points, outOf, description){
        this.name = name
        this.points = points
        this.outOf = outOf
        this.description = description
    }
}

let gradebook = new GradeBook()

let classes = 8
let classNames = ["Math", "Psychology", "Chemistry", "Orchestra", "Physics", "US History", "English", "Computer Science"]
let classTeachers = ["WIlliams", "Fourier", "Tran", "Miner","Nguyen","Vosskuhler","Fong","Wai"]

for(let i=0; i<classes; i++){
    let newClass = new Class(classNames[i],classTeachers[i])
    gradebook.addClass(newClass)
}


let testNames = ["Really Hard Test", "Really Easy Test", "Final", "Pop Quiz", "That One Quiz", "Quiz", "Another Random Pop Quiz"]
let assignmentNames = ["Just felt like giving this to you", "Final Project", "Mid-Quarter Project","Project","GroupProject","Assignment","Random Assignment"]
let descriptions = ["Need some help there, buddy?", "I can help tutor you after school", "We need to talk", "Study More", "Do Better", "Stop Failing", "Practice More"]

//set new Tests and Assignments for each class
for(let i=0; i< classes; i++){
    let classThing = gradebook.classes[i]
    //new tests/assignments array for a class
    let tests = []
    let assignments = []
    
    let noTests = randInt(4,8)
    let noAssignments = randInt(12,18)
    
    for(let i=0; i<noTests; i++){
        let testName = testNames[randInt(0, testNames.length-1)]
        let points = randInt(75,90)
        let outOf = randInt(7,10)*10
        let description = null
        if(points<80){
            description = descriptions[randInt(0, descriptions.length-1)]
        }
        tests.push(new Item(testName, points, outOf, description))
    }
    
    for(let i=0; i<noAssignments; i++){
        let assignmentName = assignmentNames[randInt(0, testNames.length-1)]
        let points = randInt(20,37)
        let outOf = randInt(3,4) * 10
        let description = null
        if(points<25){
            description = descriptions[randInt(0, descriptions.length-1)]
        }
        assignments.push(new Item(assignmentName, points, outOf, description))
    }
    classThing.setTests(tests)
    classThing.setAssignments(assignments)
    classThing.calculateGrade()
}
gradebook.calculateGPA()

//################ Attendence Objects

class Calendar{
    constructor(){
        this.calendar = []
        this.absences = []
        this.stringCalendar = []
        this.numberOfDays = randInt(28,31)

    }
    setCalendar(){
        let initialBuffer = randInt(0,6)
        let cally = []
        for(let i=0; i< initialBuffer; i++){
            cally.push(null)
        }
        for(let i=1; i< this.numberOfDays+1; i++){
            cally.push(i)
        }
        while(cally.length%7 !== 0){
            cally.push(null)
        }
        this.calendar = reshapeOneToTwo(cally, [cally.length/7,7])
    }
    setAbsences(){
        if(this.calendar.length !== 0){
            let dim = [this.calendar.length, this.calendar[0].length]
            let bruh = []
            
            for(let i=0; i<dim[0]; i++){
                let row = []
                for(let j=0; j<dim[1]; j++){
                    let prob = randInt(1,100)
                    if(prob>93){
                        row.push(1)    
                    }else{
                        row.push(0)
                    }
                }
                bruh.push(row)
            }
            this.absences = bruh
        }
    }
    setStringCalendar(){
        if(this.calendar.length !== 0){
            let dim = [this.calendar.length, this.calendar[0].length]
            let bruh = []
            
            for(let i=0; i<dim[0]; i++){
                let row = []
                for(let j=0; j<dim[1]; j++){
                    let elem = this.calendar[i][j]
                    let sVersion = null;
                    if(elem === null){
                        sVersion = ".    "
                    }else{
                        sVersion = elem.toString()
                    }
                    if(sVersion.length === 1){
                        sVersion += "   "
                    }
                    row.push(sVersion)
                }
                bruh.push(row)
            }
            this.stringCalendar = bruh
        }
    }
}

let cally = new Calendar()
cally.setCalendar()
cally.setAbsences()
cally.setStringCalendar()

let num = randInt(0, cally.calendar.length-1)
let week = cally.calendar[num]


//################ Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    navbarContainer: {
        height: deviceHeight/6,
        width: deviceWidth,
        backgroundColor: 'lightgreen',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderColor: 'white',
    },
    navButton: {
        height: deviceHeight/14,
        width: deviceWidth/4,
        backgroundColor: '#4CBB17',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    navButtonText: {
        fontSize: deviceHeight/40,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bigButton:{
        width: deviceWidth/3,
        height: 15,
        backgroundColor: 'lightgreen',
        textAlign: 'center',
        fontWeight: 'bold',
        left: deviceWidth/2 - deviceWidth/3
    }
});