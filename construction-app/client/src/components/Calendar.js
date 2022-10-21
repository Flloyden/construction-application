import React from "react";

export default function Calendar() {
  return (
    <div className="container">
      <div className="content">
        <div className="dateButtons">
          <div className="leftButtons">
            <button>Idag</button>
            <button>Föregående</button>
            <button>Nästa</button>
          </div>
          <p>2022</p>
          <div className="rightButtons">
            <button>Dag</button>
            <button>Vecka</button>
            <button>Månad</button>
            <button>År</button>
          </div>
        </div>

        <div className="tables">
        <table>
          <tr>
            <th></th>
            <th>Januari</th>
          </tr>
          <tr className="red">
            <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr className="red">
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        <table>
          <tr>
            <th></th>
            <th>Februari</th>
          </tr>
          <tr>
          <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        <table>
          <tr>
          <th></th>
            <th>Mars</th>
          </tr>
          <tr className="red">
          <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr className="green">
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        <table>
          <tr>
          <th></th>
            <th>April</th>
          </tr>
          <tr className="green">
          <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr className="red">
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        <table>
          <tr>
          <th></th>
            <th>Maj</th>
          </tr>
          <tr>
          <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr className="green">
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        <table>
          <tr>
          <th></th>
            <th>Juni</th>
          </tr>
          <tr className="green">
          <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr className="green">
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        <table>
          <tr>
          <th></th>
            <th>Juli</th>
          </tr>
          <tr>
          <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        <table>
          <tr>
          <th></th>
            <th>Augusti</th>
          </tr>
          <tr>
          <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        <table>
          <tr>
          <th></th>
            <th>September</th>
          </tr>
          <tr>
          <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        <table>
          <tr>
          <th></th>
            <th>Oktober</th>
          </tr>
          <tr>
          <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        <table>
          <tr>
          <th></th>
            <th>November</th>
          </tr>
          <tr>
          <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        <table>
          <tr>
          <th></th>
            <th>December</th>
          </tr>
          <tr>
          <td>1</td>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
          <td>2</td>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
        </div>
      </div>
    </div>
  );
}
