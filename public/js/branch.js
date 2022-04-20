$(document).ready(function(){
    $("#course").on("change", function(){
    var val = $("#course").val();
    $('#branch').empty().append('<option selected disabled value="">Choose a branch</option>');
        if(val == "Bachelor of Technology"){
            $('#branch').append('<option val="CSE">Computer Science and Engineering</option>');
            $('#branch').append('<option val="CST">Computer Science and Technology</option>');
            $('#branch').append('<option val="CE">Computer Engineering</option>');
            $('#branch').append('<option val="IT">Information Technology</option>');
            $('#branch').append('<option val="Civil Engineering">Civil Engineering</option>');
            $('#branch').append('<option val="EE">Electrical Engineering</option>');
            $('#branch').append('<option val="ECE">Electronics and Communication Engineering</option>');
            $('#branch').append('<option val="ME">Mechnical Engineering</option>');
        }else if(val == "Bachelor of Business Administration"){
            $('#branch').append('<option val="International Business">International Business</option>');
            $('#branch').append('<option val="Finance">Finance</option>');
            $('#branch').append('<option val="Entrepreneurship">Entrepreneurship</option>');
            $('#branch').append('<option val="Hospitality">Hospitality</option>');
            $('#branch').append('<option val="Human Resources">Human Resources</option>');
            $('#branch').append('<option val="Global Business">Global Business</option>');
            $('#branch').append('<option val="Marketing">Marketing</option>');
        }else if(val == "Bachelor of Commerce"){
            $('#branch').append('<option val="Marketing">Marketing</option>');
            $('#branch').append('<option val="Accountancy">Accountancy</option>');
            $('#branch').append('<option val="Finance">Finance</option>');
            $('#branch').append('<option val="Applied Economics">Applied Economics</option>');
            $('#branch').append('<option val="Banking and Finance">Banking and Finance</option>');
            $('#branch').append('<option val="Banking and Insurance">Banking and Insurance</option>');
            $('#branch').append('<option val="Management Studies">Management Studies</option>');
        }else if(val == "Bachelor of Science"){
            $('#branch').append('<option val="Agriculture">Agriculture</option>');
            $('#branch').append('<option val="Biotechnology">Biotechnology</option>');
            $('#branch').append('<option val="Forestry">Forestry</option>');
            $('#branch').append('<option val="Microbiology">Microbiology</option>');
            $('#branch').append('<option val="Physics">Physics</option>');
            $('#branch').append('<option val="Chemistry">Chemistry</option>');
            $('#branch').append('<option val="IT">Information Technology</option>');
            $('#branch').append('<option val="Computer Science">Computer Science</option>');
        }
     });
});