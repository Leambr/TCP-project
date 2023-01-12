import "./App.css";
import "./design-system/styles/grid.css";
import "./design-system/styles/layout.css";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/login" element={} />
            <Route path="/signup" element={} />
            <Route path="/landing" element={} />
            <Route path="/spending" element={} />
        </Routes>
        // <div className="layout-with-centered-content">
        /* <section className="main-container">
                <div className="col-12 mb-40">
                    <h1 className="title">Hello</h1>
                </div>
                <div className="col-6 mb-40">
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                </div>
            </section> */
        // </div>

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
