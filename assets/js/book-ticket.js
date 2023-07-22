let movieInCinema = [];
let ss_redirectedMovieName = JSON.parse(sessionStorage.getItem("_movieForTickeBook"));
let ls_movieData = JSON.parse(localStorage.getItem("_movieData"));
let selectedSeatArray = [];
let f_movieSeat = '';
let ls_seatData = '';
const handleTickets = () => {
    if (ss_redirectedMovieName) {
        document.getElementById("title").innerHTML = ss_redirectedMovieName;
        document.getElementById("subTitle").innerHTML = '<span>' + ss_redirectedMovieName + '</span> is on screen at:';

        ls_movieData.map((movieObj) => {
            if (movieObj.name === ss_redirectedMovieName) {
                JSON.parse(localStorage.getItem("_cinemaData")).map((cinemaObj) => {
                    if (cinemaObj.name === movieObj.cinema) {
                        movieInCinema.push(cinemaObj);
                    }
                });
            }
        });
    }
}
window.onload = handleTickets();

if (movieInCinema.length > 0) {
    let html_cinemaBlock = '\
        <li class="align_row" id="cinemaInfo">\
            <div><p>05 Jun, 2023</p></div>\
            <div class="row" id="showHelp">\
                <p class="green"><span></span>SEATS AVAILABLE</p>\
                <p class="red"><span></span>SEATS NOT AVAILABLE</p>\
            </div>\
        </li>';
    movieInCinema.map((obj) => {
        let f_showTime = ls_movieData.filter((movieObj) => movieObj.cid === obj.cid && movieObj.name === ss_redirectedMovieName)[0];
        let html_showTime = '';
        f_showTime.time.map((showTime) => {
            html_showTime += '<button type="btn" onclick="handleSeat(' + "'" + showTime + "'" + "," + "'" + obj.name + "'" + "," + "'" + obj.cid + "'" + ')" class="btn">' + showTime + '</button>';
        });
        html_cinemaBlock += '\
        <li class="row" id="cinema-' + obj.cid + '">\
            <div class="cinema_part">\
                <div class="align_row">\
                    <h6><a href onclick="cinemaRedirect(' + obj.cid + ')">' + obj.name + '</a>\</h6>\
                    <a href onclick="cinemaRedirect(' + obj.cid + ')"><i class="fa-sharp fa-solid fa-circle-info"></i>INFO</a>\
                </div>\
                <div class="row gap_30">\
                    <div class="align_row gap_10">\
                        <img src="../assets/images/m-ticket.png">\
                        <p>Mobile Ticket</p>\
                    </div>\
                    <div class="align_row gap_10">\
                        <img src="../assets/images/m-ticket.png">\
                        <p>Food & Beverage</p>\
                    </div>\
                </div>\
            </div>\
            <div class="data_part align_row">\
                <p>Time of Shows: </p>\
                <div class="row" id="showTimeBlock">' + html_showTime + '</div>\
            </div>\
        </li>';
        document.getElementById("ticketBookChart").innerHTML = html_cinemaBlock;
    });
}

const handleSeat = (showTime, cinemaName, f_cid) => {
    document.getElementById("addFormInner").style.display = "block";
    document.body.classList.add("scroll_hide");

    document.getElementById("modalTitle").innerHTML = ss_redirectedMovieName;
    document.getElementById("showDetails").innerHTML = "<p>The show at <b>" + cinemaName + " </b> on <b>" + showTime + "</b> O\'Clock</p>";

    ls_seatData = JSON.parse(localStorage.getItem("_seatData"));
    let f_movie = ls_movieData.filter((obj) => obj.name === ss_redirectedMovieName && obj.cid === parseInt(f_cid))[0];
    f_movieSeat = ls_seatData.filter((obj) => obj.cid === parseInt(f_cid) && obj.mid === f_movie.mid && obj.time === showTime)[0];

    let html_forSeat = '<div class="price"><h6> &#x20B9 ' + f_movieSeat.price + '/Seat</h6></div>';
    if (f_movieSeat !== undefined) {
        f_movieSeat.seats.map((seat, index) => {
            if (seat === 0) {
                html_forSeat += '<button type="btn" id=seat' + (index + 1) + ' onclick=takingSeat(' + index + ',' + f_movieSeat.price + ') class="btn btn_sm">' + (index + 1) + '</button>';
            } else if (seat === 1) {
                html_forSeat += '<button type="btn" id=seat' + (index + 1) + ' onclick=takingSeat(' + index + ',' + f_movieSeat.price + ') class="btn btn_sm" disabled>' + (index + 1) + '</button>';
            }
        });
    }

    document.getElementById("seatsDisplay").innerHTML = html_forSeat;
}

const takingSeat = (sid, price) => {
    selectedSeatArray.push(sid);
    document.getElementById("seat" + (sid + 1)).classList.add("selected");
    let totleSeatPrice = price * selectedSeatArray.length;

    document.getElementById("bottomBar").innerHTML = "<button type='button' onclick=handlePay(); class='btn gredi_btn' id='payBtn'> Pay &#x20B9 " + totleSeatPrice + "</button>";
    document.getElementById("bottomBar").classList.add("available_for_pay");
}

const handlePay = () => {
    f_movieSeat.seats.map((seat, index) => {
        selectedSeatArray.map((selectedSeat) => {
            if (index === selectedSeat) {
                f_movieSeat.seats[index] = 1;
            }
        });
    });
    localStorage.setItem("_seatData", JSON.stringify(ls_seatData));

    document.getElementById("seatsDisplay").innerHTML = '\
    <div class="payment_done">\
        <div class="check_container">\
            <div class="check_background">\
                <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">\
                    <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />\
                </svg>\
            </div>\
            <div class="check_shadow"></div>\
        </div>\
       <div class="payment_text">\
            <p>Your Payment Successfully completed.</p>\
            <p>Thank You!!!!!</p>\
       </div>\
    </div>\
    ';
    document.getElementById("bottomBar").remove();
    document.getElementById("bookTicket").classList.add("paymented");

    setTimeout(() => {
        window.location = "../user/user-home.html";
    }, 5000);
}

if(ref_closeBtn) {
    ref_closeBtn.addEventListener("click", function () {
        document.getElementById("bottomBar").innerHTML = '';
    });
}
