const getTouchPosOrEvent = (e = {}) => e.evt?.touches?.[0] || e.touches?.[0] || e.evt || e;

export default getTouchPosOrEvent;
