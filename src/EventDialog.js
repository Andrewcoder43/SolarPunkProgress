import React from 'react';

function EventDialog({ showDialog, closeModal, newEvent, setNewEvent, createNewEvent }) {
    if (!showDialog) return null;

    return (
        <dialog open>
            <div className="event">
                <input id="inputEvent" type="text" placeholder="Event"
                    value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
                <div className="inputs">
                    <input id="inputDate" type="number" placeholder="Date"
                        value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
                    <input id="inputMonth" type="number" placeholder="Month"
                        value={newEvent.month} onChange={(e) => setNewEvent({ ...newEvent, month: e.target.value })} />
                </div>
            </div>
            <div className="buttonss">
                <button onClick={closeModal}>Cancel</button>
                <button onClick={createNewEvent}>Create</button>
            </div>
        </dialog>
    );
}

export default EventDialog;