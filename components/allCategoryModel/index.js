import React from 'react';
import {
  ToastAndroid,
  AlertIOS,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,Alert,Image, TouchableNativeFeedbackBase
} from 'react-native';
import IncomeCategory from './incomeCategory';
import ExpenseCategory from './expenseCategory'
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { incomeCategoryAction } from '../../actions/allIncomeCategory';
import { expenseCategoryAction } from '../../actions/allExpenseCategory';
import { isMoment } from 'moment';
import Swal from 'sweetalert2'
import DialogInput from 'react-native-dialog-input';
import SweetAlert from 'react-native-sweet-alert';
class AllCategory extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        incomeCategoryState: false,
        expenseCategoryState: false,
        allIncomeCategory:[],
        allExpenseCategory:[],
        updateCat : false,
        incomeCategoryInput:"",
        updateExpCat : false,
        expenseCategoryInput:""



        
      };
      this.incomeCategoryChange=this.incomeCategoryChange.bind(this);
      this.expenseCategoryChange=this.expenseCategoryChange.bind(this);
      this.showDetails=this.showDetails.bind(this);
      this.showExpenseDetails=this.showExpenseDetails.bind(this);

      this.renderAllExpenseCategory=this.renderAllExpenseCategory.bind(this);
      this.IncomeCategoryModel=this.IncomeCategoryModel.bind(this);
      this.deleteExpenseCategory = this.deleteExpenseCategory.bind(this);
      this.deleteIncomeCategory = this.deleteIncomeCategory.bind(this);
      this.editIncomeCategory = this.editIncomeCategory.bind(this);
      this.ExpenseCategoryModel=this.ExpenseCategoryModel.bind(this)
  }
  showDetails=(e,id)=>{
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);
    
    SQLite.openDatabase({
        name: "WalletApp",
        location: "default"
    }).then((db) => {
     db.transaction((tx) => {
        // console.log("Database open!");
        tx.executeSql(
          'SELECT* FROM Income_Category WHERE id=?',
          [id],
          (tx, results) => {
                if (results.rows.length > 0) {
                  console.log('Results', results.rows.item(0).category);
                  SweetAlert.showAlertWithOptions({
                    // title: 'Category Details',
                    title: 'Category: '+results.rows.item(0).category,
                    subTitle: "Description: "+results.rows.item(0).description,
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    // style: 'success',
                    cancellable: true
                  },
                    callback => console.log('callback'));
              
              //     this.setState({
              //     description: results.rows.item(0).description,
              //     Category: results.rows.item(0).category,
              //     detail:!this.state.detail
              //   })
                  
              
                  
                
              // this.setState({allExpenseCategory:[]})
            }else{
                this.notifyMessage("Failed to delete Category!!!")
            
           }
         }
       );
       });
    });
  }
  showExpenseDetails=(e,id)=>{
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);
    
    SQLite.openDatabase({
        name: "WalletApp",
        location: "default"
    }).then((db) => {
     db.transaction((tx) => {
        // console.log("Database open!");
        tx.executeSql(
          'SELECT* FROM Expense_Category WHERE id=?',
          [id],
          (tx, results) => {
                if (results.rows.length > 0) {
                  console.log('Results', results.rows.item(0).category);
               
                  SweetAlert.showAlertWithOptions({
                    // title: 'Category Details',
                    title: 'Category: '+results.rows.item(0).category,
                    subTitle: "Description: "+results.rows.item(0).description,
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    // style: 'success',
                    cancellable: true
                  },
                    callback => console.log('callback'));
              //     this.setState({
              //     description: results.rows.item(0).description,
              //     Category: results.rows.item(0).category,
              //     detail:!this.state.detail
              //   })
                  
              
                  
                
              // this.setState({allExpenseCategory:[]})
            }else{
                this.notifyMessage("Failed to delete Category!!!")
            
           }
         }
       );
       });
    });
  }
  IncomeCategoryModel(visible) {
    // console.log("parrent: "+visible)
    this.setState({incomeCategoryState: visible});
  }
  ExpenseCategoryModel(visible) {
    this.setState({expenseCategoryState: visible});
  }
  notifyMessage=(msg)=> {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  }
  fetchData=()=>{
    console.log("Database open Now!");

    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    SQLite.openDatabase({
        name: "WalletApp",
        location: "default"
    }).then((db) => {
     db.transaction((tx) => {
        // console.log("Database open Now!");
        // db.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS Income_Category(id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20), description VARCHAR(255))');
      }).then(() => {
        console.log('database created successfully!!!')
      }).catch(error => {
          console.log(error);
      });
        db.transaction((tx) => {
        tx.executeSql(
         'SELECT * FROM Income_Category',
         [],
         (tx, results) => {
           var len = results.rows.length;
           // var len = results.rows.length;
           var record =[];
           for (let i = 0; i < len; i++) {
                var row = results.rows.item(i);
                // var id = row.id;
                // console.log("row.id",row.id)
                for (let j = row.id; j === row.id ; j++) {
                record.push(
                  <View key={j} style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }} >
                  <Text style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',textAlign:'center',color:'#5cb85c'}}>{(row.category.length > 10)? row.category.substring(0,10):row.category}</Text>
                  {/* <Text style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',textAlign:'center',color:'#5cb85c'}}>{(row.description.length > 10)? row.description.substring(0,10):row.description}</Text> */}
                   <View style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',alignItems:'center',color:'#5cb85c'}}>
                  
       <View style={{flexDirection: 'row'}}>
       <View>
       <TouchableOpacity  onPress={(e)=>this.editIncomeCategory(e,j)}>
       <Icon name="edit" size={20} color='#00b5ec'/>
       </TouchableOpacity>
       </View>
         <View style={{marginLeft: 2}}>
         <TouchableOpacity  onPress={(e)=>this.deleteIncomeCategory(e,j)}>
       <Icon name="trash" size={20} color='#d9534f'/>
       </TouchableOpacity>
       </View>
       <View style={{marginLeft: 2}}>
       <TouchableOpacity  onPress={(e)=>this.showDetails(e,j)}>
       <Icon name="caret-down" size={20} color='#ccc'/>
       </TouchableOpacity>
       </View>
     
       </View>        
                      {/* <Text>Delete</Text> */}
                   
                   </View>
                   </View>
      //             <View key={j} style={styles.incomeCategoryContainer}>
      //             <Text>{(row.category.length > 10)? row.category.substring(0,10):row.category}</Text>
      //             <View style={styles.btnContainer} >
      //               <TouchableOpacity  onPress={(e)=>this.deleteIncomeCategory(e,j)}>
      //  <Icon name="trash" size={20} color='grey'/>
                    
      //                 {/* <Text>Delete</Text> */}
      //               </TouchableOpacity>
                   
      //             </View>
      //                  </View>
                    )
                }
              }
            this.setState({allIncomeCategory: record});
           // console.log('len',len);
           if (len > 0) {
             // console.log(results.rows.item(0).category);
            
           }else{
             // console.log('No user found');
            
           }
         }
       );
       });
    });
  }
  fetchExpenseCategory=()=>{
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    SQLite.openDatabase({
        name: "WalletApp",
        location: "default"
    }).then((db) => {
     db.transaction((tx) => {
        // console.log("Database open!");
      
          tx.executeSql('CREATE TABLE IF NOT EXISTS Expense_Category(id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20), description VARCHAR(255))');
        }).then(() => {
          console.log('database created successfully!!!')
        }).catch(error => {
            console.log(error);
        });
          db.transaction((tx) => {
            tx.executeSql(
         'SELECT * FROM Expense_Category',
         [],
         (tx, results) => {
           var len = results.rows.length;
           // var len = results.rows.length;
           var record =[];
           for (let i = 0; i < len; i++) {
                var row = results.rows.item(i);
                // var id = row.id;
                // console.log("row.id",row.id)
                for (let j = row.id; j === row.id ; j++) {
                record.push(
                  <View key={j} style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }} >
                  <Text style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',textAlign:'center',color:'#d9534f'}}>{(row.category.length > 10)? row.category.substring(0,10):row.category}</Text>
                  {/* <Text style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',textAlign:'center',color:'#d9534f'}}>{(row.description.length > 10)? row.description.substring(0,10):row.description}</Text> */}
                   <View style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',alignItems:'center',color:'#d9534f'}}>
                  
       <View style={{flexDirection: 'row'}}>
       <View>
       <TouchableOpacity  onPress={(e)=>this.editExpenseCategory(e,j)}>
       <Icon name="edit" size={20} color='#00b5ec'/>
       </TouchableOpacity>
       </View>
         <View style={{marginLeft: 2}}>
         <TouchableOpacity  onPress={(e)=>this.deleteExpenseCategory(e,j)}>
       <Icon name="trash" size={20} color='#d9534f'/>
       </TouchableOpacity>
       </View>
       <View style={{marginLeft: 2}}>
       <TouchableOpacity  onPress={(e)=>this.showExpenseDetails(e,j)}>
       <Icon name="caret-down" size={20} color='#ccc'/>
       </TouchableOpacity>
       </View>
       </View>        
                      {/* <Text>Delete</Text> */}
                   
                   </View>
                   </View>
               
               
              //  <View key={j} style={styles.incomeCategoryContainer}>
        
              //   <Text>{(row.category.length > 10)? row.category.substring(0,10):row.category}</Text>
                
              //   <View style={styles.btnContainer}>
              //   <TouchableOpacity key={i} onPress={(e)=>this.deleteExpenseCategory(e,j)}>
              //       <Text>Delete</Text>
              //     </TouchableOpacity>
              //   </View>
              //        </View>
                    )
                }
                // }
                // })
            }
            this.setState({allExpenseCategory: record});
          //  console.log('record',record);
           if (len > 0) {
             // console.log(results.rows.item(0).category);
            
           }else{
             // console.log('No user found');
            
           }
         }
       );
       });
    });
  }
  componentDidMount(){
// this.setState({
//   allExpenseCategory: ExpenseCategoryArray,
// allIncomeCategory: IncomeCategoryArray
// })
  this.fetchData();  
  this.fetchExpenseCategory();
 }
 deleteIncomeCategory=(e, id)=>{
  console.log(id)
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);
  
  SQLite.openDatabase({
      name: "WalletApp",
      location: "default"
  }).then((db) => {
   db.transaction((tx) => {
      // console.log("Database open!");
      tx.executeSql(
        'DELETE FROM  Income_Category WHERE id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            this.notifyMessage("Category deleted successfully!!!")
            // this.setState({allExpenseCategory:[]})
          }else{
              this.notifyMessage("Failed to delete Category!!!")
          
         }
       }
     );
     });
  });
  this.fetchData(); 
   }
   editIncomeCategory=(e, id)=>{
    console.log(id)
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);
    
    SQLite.openDatabase({
        name: "WalletApp",
        location: "default"
    }).then((db) => {
     db.transaction((tx) => {
        // console.log("Database open!");
        tx.executeSql(
          'SELECT* FROM Income_Category WHERE id=?',
          [id],
          (tx, results) => {
                if (results.rows.length > 0) {
                  console.log('Results', results.rows.item(0).category);
                this.setState({
                  IncomeCategoryId:id,
                  preIncomeCategory: results.rows.item(0).category,
                  updateCat:!this.state.updateCat
                })
                  
              
                  
                
              // this.setState({allExpenseCategory:[]})
            }else{
                this.notifyMessage("Failed to delete Category!!!")
            
           }
         }
       );
       });
    });
    this.fetchData(); 
     }
     editExpenseCategory=(e, id)=>{
      console.log(id)
      SQLite.DEBUG(true);
      SQLite.enablePromise(true);
      
      SQLite.openDatabase({
          name: "WalletApp",
          location: "default"
      }).then((db) => {
       db.transaction((tx) => {
          // console.log("Database open!");
          tx.executeSql(
            'SELECT* FROM Expense_Category WHERE id=?',
            [id],
            (tx, results) => {
                  if (results.rows.length > 0) {
                    console.log('Results', results.rows.item(0).category);
                  this.setState({
                    expenseCategoryId:id,
                    preExpenseCategory: results.rows.item(0).category,
                    updateExpCat:!this.state.updateExpCat
                  })
                    
                
                    
                  
                // this.setState({allExpenseCategory:[]})
              }else{
                  this.notifyMessage("Failed to edit Category!!!")
              
             }
           }
         );
         });
      });
      this.fetchData(); 
       }
  
   renderAllExpenseCategory=()=>{
    // this.props.allIncomeCategory;
    const {allExpenseCategory}= this.state;
    console.log("allExpenseCategory: ",allExpenseCategory)
    return(
    <>
   {allExpenseCategory.map((data, key)=>{
     console.log("data: ",data)
      return(
        <View key={key}>
         {data}
         </View>
      )
        })
   }
   </>
   );
   }
 deleteExpenseCategory=(e, id)=>{
console.log(id)
SQLite.DEBUG(true);
SQLite.enablePromise(true);

SQLite.openDatabase({
    name: "WalletApp",
    location: "default"
}).then((db) => {
 db.transaction((tx) => {
    // console.log("Database open!");
    tx.executeSql(
      'DELETE FROM  Expense_Category WHERE id=?',
      [id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          this.notifyMessage("Category deleted successfully!!!")
          // this.setState({allExpenseCategory:[]})
        }else{
            this.notifyMessage("Failed to delete Category!!!")
        
       }
     }
   );
   });
});
this.fetchExpenseCategory(); 
 }
 

 renderAllExpenseCategory=()=>{
  // this.props.allIncomeCategory;
  const {allExpenseCategory}= this.state;
  console.log("allExpenseCategory: ",allExpenseCategory)
  return(
  <>
 {allExpenseCategory.map((data, key)=>{
   console.log("data: ",data)
    return(
      <View key={key}>
       {data}
       </View>
    )
      })
 }
 </>
 );
 }
 incomeCategoryChange(value, id){
  console.log("new category: "+value)
  SQLite.DEBUG(true);
SQLite.enablePromise(true);

SQLite.openDatabase({
    name: "WalletApp",
    location: "default"
}).then((db) => {
 db.transaction((tx) => {
    // console.log("Database open!");
    tx.executeSql(
      'UPDATE Income_Category set category=? where id=?',
      [value, id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          this.notifyMessage("Category updated successfully!!!")
          this.fetchData();  
          this.setState({
           updateCat: !this.state.updateCat
         }) // this.setState({allExpenseCategory:[]})
        }else{
            this.notifyMessage("Failed to update Category!!!")
        
       }
     }
   );
   });
});

}
expenseCategoryChange(value, id){
  console.log("new category: "+value)
  SQLite.DEBUG(true);
SQLite.enablePromise(true);

SQLite.openDatabase({
    name: "WalletApp",
    location: "default"
}).then((db) => {
 db.transaction((tx) => {
    // console.log("Database open!");
    tx.executeSql(
      'UPDATE Expense_Category set category=? where id=?',
      [value, id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          this.notifyMessage("Category updated successfully!!!")
          this.fetchExpenseCategory();  
          this.setState({
           updateExpCat: !this.state.updateExpCat
         }) // this.setState({allExpenseCategory:[]})
        }else{
            this.notifyMessage("Failed to update Category!!!")
        
       }
     }
   );
   });
});

}
   render(){
    var str = 'Some very long string';
    if(str.length > 10) str = str.substring(0,10);
     console.log('str: '+ str)
     const {allIncomeCategory}= this.state;
     const incomeCategory= allIncomeCategory.map((data, key)=>{
      // console.log('Income Category: '+this.props.allIncomeCategory);
      // console.log('Expense Category: '+ this.props.allExpenseCategory) 
      return (
          <View key={key} style={styles.incomeCategoryContainer}>
     <Text>{data}</Text>
     <View style={styles.btnContainer}>
       <TouchableOpacity>
       <Icon name="trash" size={20} color='#000'/>

         {/* <Text>Delete</Text> */}
       </TouchableOpacity>
       <TouchableOpacity>
         <Text>Edit</Text>
       </TouchableOpacity>
     </View>
          </View>
        )
      })
    //    console.log("child: "+this.props.modelState)
       return(
           <>
    <IncomeCategory incomeCategoryState={this.state.incomeCategoryState} IncomeCategoryModel={this.IncomeCategoryModel} fetchData={this.fetchData}/>
     <ExpenseCategory expenseCategoryState={this.state.expenseCategoryState} ExpenseCategoryModel={this.ExpenseCategoryModel} fetchExpenseCategory={this.fetchExpenseCategory} renderAllExpenseCategory={this.renderAllExpenseCategory}/>
      <Modal
          animationType='fade'
          transparent={false}
          visible={this.props.allCategoryState}
          onRequestClose={() => this.props.setAllCategoryModel(!this.props.allCategoryState)}
          >
               {/* <View style={styles.allCategory}>
                 <View style={{justifyContent: 'center', alignItems: 'center'}}>
               <Text style={styles.incomeCategoryText}>INCOME CATEGORY LIST</Text>
               </View> */}
              {this.state.detail?
               <DialogInput isDialogVisible={this.state.isDialogVisible}
               title={"Category Detail"}
               message={"Category:- "+this.state.preIncomeCategory}
               submitInput={(incomeCategoryInput) => this.incomeCategoryChange(incomeCategoryInput, this.state.IncomeCategoryId)}
               submitText={"Update"}
               closeDialog={ () => {this.setState({
                detail: !this.state.detail
              })}}>
   </DialogInput>:null}
              {this.state.updateCat?
               <DialogInput isDialogVisible={this.state.isDialogVisible}
               title={"Update Income Category"}
               message={"Previous Category:- "+this.state.preIncomeCategory}
               submitInput={(incomeCategoryInput) => this.incomeCategoryChange(incomeCategoryInput, this.state.IncomeCategoryId)}
               submitText={"Update"}
               closeDialog={ () => {this.setState({
                updateCat: !this.state.updateCat
              })}}>
   </DialogInput>:null}
   {this.state.updateExpCat?
               <DialogInput isDialogVisible={this.state.isDialogVisible}
               title={"Update Expense Category"}
               message={"Previous Category:- "+this.state.preExpenseCategory}
               submitInput={(expenseCategoryInput) => this.expenseCategoryChange(expenseCategoryInput, this.state.expenseCategoryId)}
               submitText={"Update"}
               closeDialog={ () => {this.setState({
                updateExpCat: !this.state.updateExpCat
              })}}>
   </DialogInput>:null}
               <ScrollView>
       <View style={{marginLeft:5,marginRight:5}} >
          <Text style={{textAlign:'center', fontWeight:"bold",color:'#5cb85c',marginBottom:3,fontSize:25}}>INCOME CATEGORIES</Text>
          <View style={{ flex: 1,flexDirection: "row", alignSelf: 'stretch',backgroundColor:'lightgrey' }}>
          <Text style={{ flex: 1, alignSelf: 'stretch',borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Category</Text>
          {/* <Text style={{flex: 1,alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Description</Text> */}
          <Text style={{flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Actions</Text>
          </View>
          {this.state.allIncomeCategory}
         
        </View> 
        </ScrollView>
            {/* <ScrollView>
            <View style={styles.allIncomeCategory}>
             {this.state.allIncomeCategory}
             </View>
             </ScrollView> */}
             {/* <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
             <Text style={styles.expenseCategoryText}>EXPENSE CATEGORY LIST</Text>
             </View>
             <ScrollView>
            <View style={styles.allExpenseCategory}>
             {this.state.allExpenseCategory}
             </View>
             </ScrollView> */}
 <ScrollView>
       <View style={{marginLeft:5,marginRight:5,marginBottom:20}} >
          <Text style={{textAlign:'center', fontWeight:"bold",color:'#d9534f',marginBottom:3,fontSize:25}}>EXPENSE CATEGORIES</Text>
          <View style={{ flex: 1,flexDirection: "row", alignSelf: 'stretch',backgroundColor:'lightgrey' }}>
          <Text style={{ flex: 1, alignSelf: 'stretch',borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Category</Text>
          {/* <Text style={{flex: 1,alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Description</Text> */}
          <Text style={{flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Actions</Text>
          </View>
          {this.state.allExpenseCategory}
         
        </View> 
        </ScrollView>
            
              <TouchableOpacity
                style={styles.incomeBtn}
                onPress={()=>this.IncomeCategoryModel(!this.state.incomeCategoryState)}>
                <Text style={styles.homeText}>ADD INCOME CATEGORY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.expenseBtn}
                onPress={() => {this.ExpenseCategoryModel(!this.state.expenseCategoryState)}}>
                <Text style={styles.homeText}>ADD EXPENSE CATEGORY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.homeBtn}
                onPress={() => this.props.setAllCategoryModel(!this.props.allCategoryState)}>
                <Text style={styles.homeText}>Home</Text>
              </TouchableOpacity>
              {/* </View> */}
        </Modal>
</>
       
       )
   }
}
const mapStateToProps = state => {
  return {
    allIncomeCategory: state.places.allIncomeCategory,
    allExpenseCategory: state.places.allExpenseCategory

  }
}
const mapDispatchToProps = dispatch => {
  return {
    add: () => {
      dispatch(incomeCategoryAction())
    },
    add1: () => {
      dispatch(expenseCategoryAction())
    },
    
  }
  
}
export default connect(mapStateToProps,mapDispatchToProps)(AllCategory);
// export default AllCategory;

   const styles = StyleSheet.create({
  
  homeBtn:{
    width: '100%',
    height: 50,
    backgroundColor: '#00b5ec',
    justifyContent: 'center',
    alignItems: 'center',

  },
  allCategory:{
    flex: 1,
    justifyContent:'space-between',
   backgroundColor: '#fff',
  },
  btnContainer:{
  flexDirection: 'row',
  backgroundColor: '#d9534f',
  borderRadius: 5,
  height:30,
  width:60,
  justifyContent: 'center',
  alignItems: 'center'
  },
  allIncomeCategory:{
   justifyContent: 'center',
  
   alignItems: 'center'
  },
  allExpenseCategory:{
    // marginTop: 10,
    justifyContent: 'center',
    // backgroundColor: 'lightgreen',
    alignItems: 'center'
   },
  incomeCategoryText:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5cb85c',
    borderBottomWidth: 2,
    borderBottomColor: '#5cb85c',


  },
  expenseCategoryText:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#d9534f',
    borderBottomWidth: 2,
    borderBottomColor: '#d9534f',

  },
  incomeCategoryContainer:{
 flexDirection: 'row',
 justifyContent:'space-between',
 width: '100%',
 padding: 10
  },
  incomeBtn:{
    width: '100%',
    height: 50,
    backgroundColor: '#00b5ec',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 2

  },
  expenseBtn:{
    width: '100%',
    height: 50,
    backgroundColor: '#00b5ec',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 2

  },
  homeText: {
  color: '#fff',
  fontWeight: 'bold'
  },
  
});

// ["glass","music","search","envelope-o","heart","star","star-o","user","film","th-large","th","th-list","check","remove","close","times","search-plus","search-minus","power-off","signal","gear","cog","trash-o","home","file-o","clock-o","road","download","arrow-circle-o-down","arrow-circle-o-up","inbox","play-circle-o","rotate-right","repeat","refresh","list-alt","lock","flag","headphones","volume-off","volume-down","volume-up","qrcode","barcode","tag","tags","book","bookmark","print","camera","font","bold","italic","text-height","text-width","align-left","align-center","align-right","align-justify","list","dedent","outdent","indent","video-camera","photo","image","picture-o","pencil","map-marker","adjust","tint","edit","pencil-square-o","share-square-o","check-square-o","arrows","step-backward","fast-backward","backward","play","pause","stop","forward","fast-forward","step-forward","eject","chevron-left","chevron-right","plus-circle","minus-circle","times-circle","check-circle","question-circle","info-circle","crosshairs","times-circle-o","check-circle-o","ban","arrow-left","arrow-right","arrow-up","arrow-down","mail-forward","share","expand","compress","plus","minus","asterisk","exclamation-circle","gift","leaf","fire","eye","eye-slash","warning","exclamation-triangle","plane","calendar","random","comment","magnet","chevron-up","chevron-down","retweet","shopping-cart","folder","folder-open","arrows-v","arrows-h","bar-chart-o","bar-chart","twitter-square","facebook-square","camera-retro","key","gears","cogs","comments","thumbs-o-up","thumbs-o-down","star-half","heart-o","sign-out","linkedin-square","thumb-tack","external-link","sign-in","trophy","github-square","upload","lemon-o","phone","square-o","bookmark-o","phone-square","twitter","facebook-f","facebook","github","unlock","credit-card","feed","rss","hdd-o","bullhorn","bell","certificate","hand-o-right","hand-o-left","hand-o-up","hand-o-down","arrow-circle-left","arrow-circle-right","arrow-circle-up","arrow-circle-down","globe","wrench","tasks","filter","briefcase","arrows-alt","group","users","chain","link","cloud","flask","cut","scissors","copy","files-o","paperclip","save","floppy-o","square","navicon","reorder","bars","list-ul","list-ol","strikethrough","underline","table","magic","truck","pinterest","pinterest-square","google-plus-square","google-plus","money","caret-down","caret-up","caret-left","caret-right","columns","unsorted","sort","sort-down","sort-desc","sort-up","sort-asc","envelope","linkedin","rotate-left","undo","legal","gavel","dashboard","tachometer","comment-o","comments-o","flash","bolt","sitemap","umbrella","paste","clipboard","lightbulb-o","exchange","cloud-download","cloud-upload","user-md","stethoscope","suitcase","bell-o","coffee","cutlery","file-text-o","building-o","hospital-o","ambulance","medkit","fighter-jet","beer","h-square","plus-square","angle-double-left","angle-double-right","angle-double-up","angle-double-down","angle-left","angle-right","angle-up","angle-down","desktop","laptop","tablet","mobile-phone","mobile","circle-o","quote-left","quote-right","spinner","circle","mail-reply","reply","github-alt","folder-o","folder-open-o","smile-o","frown-o","meh-o","gamepad","keyboard-o","flag-o","flag-checkered","terminal","code","mail-reply-all","reply-all","star-half-empty","star-half-full","star-half-o","location-arrow","crop","code-fork","unlink","chain-broken","question","info","exclamation","superscript","subscript","eraser","puzzle-piece","microphone","microphone-slash","shield","calendar-o","fire-extinguisher","rocket","maxcdn","chevron-circle-left","chevron-circle-right","chevron-circle-up","chevron-circle-down","html5","css3","anchor","unlock-alt","bullseye","ellipsis-h","ellipsis-v","rss-square","play-circle","ticket","minus-square","minus-square-o","level-up","level-down","check-square","pencil-square","external-link-square","share-square","compass","toggle-down","caret-square-o-down","toggle-up","caret-square-o-up","toggle-right","caret-square-o-right","euro","eur","gbp","dollar","usd","rupee","inr","cny","rmb","yen","jpy","ruble","rouble","rub","won","krw","bitcoin","btc","file","file-text","sort-alpha-asc","sort-alpha-desc","sort-amount-asc","sort-amount-desc","sort-numeric-asc","sort-numeric-desc","thumbs-up","thumbs-down","youtube-square","youtube","xing","xing-square","youtube-play","dropbox","stack-overflow","instagram","flickr","adn","bitbucket","bitbucket-square","tumblr","tumblr-square","long-arrow-down","long-arrow-up","long-arrow-left","long-arrow-right","apple","windows","android","linux","dribbble","skype","foursquare","trello","female","male","gittip","gratipay","sun-o","moon-o","archive","bug","vk","weibo","renren","pagelines","stack-exchange","arrow-circle-o-right","arrow-circle-o-left","toggle-left","caret-square-o-left","dot-circle-o","wheelchair","vimeo-square","turkish-lira","try","plus-square-o","space-shuttle","slack","envelope-square","wordpress","openid","institution","bank","university","mortar-board","graduation-cap","yahoo","google","reddit","reddit-square","stumbleupon-circle","stumbleupon","delicious","digg","pied-piper-pp","pied-piper-alt","drupal","joomla","language","fax","building","child","paw","spoon","cube","cubes","behance","behance-square","steam","steam-square","recycle","automobile","car","cab","taxi","tree","spotify","deviantart","soundcloud","database","file-pdf-o","file-word-o","file-excel-o","file-powerpoint-o","file-photo-o","file-picture-o","file-image-o","file-zip-o","file-archive-o","file-sound-o","file-audio-o","file-movie-o","file-video-o","file-code-o","vine","codepen","jsfiddle","life-bouy","life-buoy","life-saver","support","life-ring","circle-o-notch","ra","resistance","rebel","ge","empire","git-square","git","y-combinator-square","yc-square","hacker-news","tencent-weibo","qq","wechat","weixin","send","paper-plane","send-o","paper-plane-o","history","circle-thin","header","paragraph","sliders","share-alt","share-alt-square","bomb","soccer-ball-o","futbol-o","tty","binoculars","plug","slideshare","twitch","yelp","newspaper-o","wifi","calculator","paypal","google-wallet","cc-visa","cc-mastercard","cc-discover","cc-amex","cc-paypal","cc-stripe","bell-slash","bell-slash-o","trash","copyright","at","eyedropper","paint-brush","birthday-cake","area-chart","pie-chart","line-chart","lastfm","lastfm-square","toggle-off","toggle-on","bicycle","bus","ioxhost","angellist","cc","shekel","sheqel","ils","meanpath","buysellads","connectdevelop","dashcube","forumbee","leanpub","sellsy","shirtsinbulk","simplybuilt","skyatlas","cart-plus","cart-arrow-down","diamond","ship","user-secret","motorcycle","street-view","heartbeat","venus","mars","mercury","intersex","transgender","transgender-alt","venus-double","mars-double","venus-mars","mars-stroke","mars-stroke-v","mars-stroke-h","neuter","genderless","facebook-official","pinterest-p","whatsapp","server","user-plus","user-times","hotel","bed","viacoin","train","subway","medium","yc","y-combinator","optin-monster","opencart","expeditedssl","battery-4","battery","battery-full","battery-3","battery-three-quarters","battery-2","battery-half","battery-1","battery-quarter","battery-0","battery-empty","mouse-pointer","i-cursor","object-group","object-ungroup","sticky-note","sticky-note-o","cc-jcb","cc-diners-club","clone","balance-scale","hourglass-o","hourglass-1","hourglass-start","hourglass-2","hourglass-half","hourglass-3","hourglass-end","hourglass","hand-grab-o","hand-rock-o","hand-stop-o","hand-paper-o","hand-scissors-o","hand-lizard-o","hand-spock-o","hand-pointer-o","hand-peace-o","trademark","registered","creative-commons","gg","gg-circle","tripadvisor","odnoklassniki","odnoklassniki-square","get-pocket","wikipedia-w","safari","chrome","firefox","opera","internet-explorer","tv","television","contao","500px","amazon","calendar-plus-o","calendar-minus-o","calendar-times-o","calendar-check-o","industry","map-pin","map-signs","map-o","map","commenting","commenting-o","houzz","vimeo","black-tie","fonticons","reddit-alien","edge","credit-card-alt","codiepie","modx","fort-awesome","usb","product-hunt","mixcloud","scribd","pause-circle","pause-circle-o","stop-circle","stop-circle-o","shopping-bag","shopping-basket","hashtag","bluetooth","bluetooth-b","percent","gitlab","wpbeginner","wpforms","envira","universal-access","wheelchair-alt","question-circle-o","blind","audio-description","volume-control-phone","braille","assistive-listening-systems","asl-interpreting","american-sign-language-interpreting","deafness","hard-of-hearing","deaf","glide","glide-g","signing","sign-language","low-vision","viadeo","viadeo-square","snapchat","snapchat-ghost","snapchat-square","pied-piper","first-order","yoast","themeisle","google-plus-circle","google-plus-official","fa","font-awesome","handshake-o","envelope-open","envelope-open-o","linode","address-book","address-book-o","vcard","address-card","vcard-o","address-card-o","user-circle","user-circle-o","user-o","id-badge","drivers-license","id-card","drivers-license-o","id-card-o","quora","free-code-camp","telegram","thermometer-4","thermometer","thermometer-full","thermometer-3","thermometer-three-quarters","thermometer-2","thermometer-half","thermometer-1","thermometer-quarter","thermometer-0","thermometer-empty","shower","bathtub","s15","bath","podcast","window-maximize","window-minimize","window-restore","times-rectangle","window-close","times-rectangle-o","window-close-o","bandcamp","grav","etsy","imdb","ravelry","eercast","microchip","snowflake-o","superpowers","wpexplorer","meetup"]