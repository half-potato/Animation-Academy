function Frame(steps, objects) {
	this.objects = objects;
	this.steps = steps;

	this.autoObjects = function() {
		var i;
		objects = [];
		for(i in steps) {
			objects[objects.length] = steps[i].target;
		}
	}

	this.getClass = function() {
		return "Frame";
	}
    
    this.doesContain = function(n) {
        this.autoObjects();
        for (i in objects) {
            if(steps[i].target === n) {
                return true;
            }
            return false;
        }
    }
}