// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ProductRegistry {

    address owner ;
    constructor(){
        owner= msg.sender ;
    }

    string[] public productsList ;
    address[] public manufacturers ;

    mapping (address => string[]) public manufacturorProducts ;

    mapping (string => ProductDetails) public manufacturingDetails;

    mapping(address => uint) public isManufacturerExist ;
    
    struct ProductDetails{
    string  id;
    string name;
    string description;
    string origin;
    uint256 manufacturingDate;
    } 


    ProductDetails public  details = ProductDetails({
     id:"",
     name: "",
     description: "",
     origin: "",
     manufacturingDate: 0
    }) ;                                                   

    modifier onlyManufacturer(address _manufacturer){
        require(isManufacturerExist[_manufacturer]==1, "you are not a manufacturer");
        _;
    }


    event manifactured(string id, string name);


    function addManufacturer(address _manufacturer) public {
        require(msg.sender== owner, "you don't have access to add the manufacturer ");
        manufacturers.push(_manufacturer) ;
        isManufacturerExist[_manufacturer]= 1 ;
    }


    function setManufacturingDetails(string memory _id, string memory _name, string memory _description, string memory _origin) public onlyManufacturer(msg.sender) {
        details.id= _id ;
        details.name = _name;
        details.description  = _description ;
        details.origin = _origin ;
        details.manufacturingDate  = block.timestamp ;

        manufacturingDetails[_id]= details ;
        emit manifactured(_id, _name);
        manufacturorProducts[msg.sender].push(_id);  
    }

    function getManufacturingDetails(string memory _id) public view returns(ProductDetails memory) {
        return manufacturingDetails[_id];
    }


}
