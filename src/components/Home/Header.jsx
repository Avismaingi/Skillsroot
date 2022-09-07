import React from 'react';
import { Card, Row } from 'react-bootstrap';
import HeaderImg from '../../assets/header-img.jpg'
import '../../assets/Style.css'
import Abhilash from '../../assets/team/Abhilash.jpg'
import Picture14 from '../../assets/team/Picture14.jpg'
import Picture12 from '../../assets/team/Picture12.jpg'
import Picture4 from '../../assets/team/Picture4.png'
import Picture13 from '../../assets/team/Picture13.jpg'
import Picture6 from '../../assets/team/Picture6.jpg'
import Picture9 from '../../assets/team/Picture9.jpg'
import Picture10 from '../../assets/team/Picture10.png'

const Header = () => {
  return (
    <React.Fragment>
      <div className="container-fluid mt-2 ">
        <div className="row">
          <div className="col-md-6 text-center align-items-center mt-5">
            <h2 className='display-2 '>Skill Hub</h2>
            <hr/>
            <p className='lead'>
            To ensure empowerment and sustainable livlihood through holistic skilling,guidance and counselling. To skill youth and women and connect them with jobs.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img src={HeaderImg} alt="Header" className="img-fluid" />
            </div>
        </div>
      </div>
      <div className='container-fluid mt-5'>
          <h2 className='display-4 text-center'>Our Team : HUGS-FOR-BUGS</h2>
      </div>
      <div className='container-fluid mt-5'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='card'>
              <div className='card-body'>
                <img src={Abhilash} className="img-fluid" />
                </div>
                <div className='card-footer'>
                  <h5 className='card-title text-center'>Abhilash</h5>
              </div>
            </div>
          </div>

          <div className='col-md-3'>
            <div className='card'>
              <div className='card-body'>
                <img src={Picture14} className="img-fluid" />
                </div>
                <div className='card-footer'>
                  <h5 className='card-title text-center'>Vishnu Vardhan Reddy </h5>
              </div>
            </div>
          </div>

          <div className='col-md-3'>
            <div className='card'>
              <div className='card-body'>
                <img src={Picture12} className="img-fluid" />
                </div>
                <div className='card-footer'>
                  <h5 className='card-title text-center'>Shruti Dubey </h5>
              </div>
            </div>
          </div>

          <div className='col-md-3'>
            <div className='card'>
              <div className='card-body'>
                <img src={Picture4} className="img-fluid" />
                </div>
                <div className='card-footer'>
                  <h5 className='card-title text-center'>Saumya Nigam</h5>
              </div>
            </div>
          </div>

          <div className='col-md-3'>
            <div className='card'>
              <div className='card-body'>
                <img src={Picture13} className="img-fluid" />
                </div>
                <div className='card-footer'>
                  <h5 className='card-title text-center'>Pragya Gupta </h5>
              </div>
            </div>
          </div>

          <div className='col-md-3'>
            <div className='card'>
              <div className='card-body'>
                <img src={Picture6} className="img-fluid" />
                </div>
                <div className='card-footer'>
                  <h5 className='card-title text-center'>Sanjana Siboo </h5>
              </div>
            </div>
          </div>

          <div className='col-md-3'>
            <div className='card'>
              <div className='card-body'>
                <img src={Picture9} className="img-fluid" />
                </div>
                <div className='card-footer'>
                  <h5 className='card-title text-center'>A J Srivathsav </h5>
              </div>
            </div>
          </div>

          <div className='col-md-3'>
            <div className='card'>
              <div className='card-body'>
                <img src={Picture10} className="img-fluid" />
                </div>
                <div className='card-footer'>
                  <h5 className='card-title text-center'>Avneeth </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className='bg-white'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <p>Copyright &copy; Skill Hub</p>
            </div>
          </div>
        </div>
      </footer>

    </React.Fragment>
  )
}

export default Header