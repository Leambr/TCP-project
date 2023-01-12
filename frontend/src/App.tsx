import './App.css';
import './design-system/styles/grid.css';
import './design-system/styles/layout.css';
import { Routes, Route } from 'react-router-dom';
import Login from './component/page/auth/login/Login';
import Signup from './component/page/auth/signup/Signup';
import Landing from './component/page/landing/Landing';
import Spending from './component/page/spending/Spending';

function App() {
    return (
        <div className="layout-with-centered-content">
            <section className="main-container">
                <div className="row">
                    <div className="col-4"></div>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </div>
            </section>

            <section className="main-container">
                <Routes>
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/spending" element={<Spending />} />
                </Routes>
            </section>
        </div>

        // Exemple d'utilisation de la grid et du layout pour les composants
        // <div className="layout-with-centered-content">
        //           <section className="main-container">
        //               <div className="col-12 mb-40"></div>
        //           </section>
        //           <section className="main-container">
        //               {openCart && <Cart onHideCart={hideCartHandler} />}
        //           </section>
        //           <section className="main-container">
        //               <div className="col-6">
        //                   <Card>
        //                       {mealCardData.map((meal) => {
        //                           return <MealCard key={meal.id} meal={meal} />;
        //                       })}
        //                   </Card>
        //               </div>
        //           </section>
        //   </div>
    );
}

export default App;
